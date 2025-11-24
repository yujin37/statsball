import { Link } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./players.module.scss"

interface Batter {
    id: number;
    teams: string;
    name: string;
    avg: number;
}

interface Pitcher {
    id: number;
    teams: string;
    name: string;
    wins: number;
}
const PlayerStats = () => {
    const [topBatters, setTopBatters] = useState<Batter[]>([]);
    const [topPitchers, setTopPitchers] = useState<Pitcher[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopWinPitcher = async() => {
            try{
                setLoading(true)
                const res = await axios.get<Pitcher[]>(
                    "/api/Ranking/pitcher/topPitchers?type=wins"
                );
                setTopPitchers(res.data);
                console.log(res.data);
            } catch(error) {
                console.error(`데이터 가져오기 오류`, error);
                return []
            }
        }
        const fetchTopAvgBatter = async() => {
            try{
                setLoading(true)
                const res = await axios.get<Batter[]>(
                    "/api/Ranking/player/topPlayers?type=avg"
                );
                setTopBatters(res.data);
            } catch(error) {
                console.error(`데이터 가져오기 오류`, error);
                return []
            }
        }
        fetchTopWinPitcher();
        fetchTopAvgBatter();
    }, [])
    return (
        <Layout>
            <h2>선수 기록</h2>
                <h3>투수 최다 승 TOP3</h3>
                <div className={styles.navContainer}>
                    <Link to="/playerStats/pitchersStats" className={styles.navLink}>투수 기록 전체보기</Link>
                </div>
                <li className="header">
                    <span>순위</span>
                    <span>팀</span>
                    <span>선수명</span>
                    <span>승</span>
                </li>
                {topPitchers.map((p, idx) => (
                    <li key={p.id}>
                        <span>{idx+1}</span>
                        <span>{p.teams}</span>
                        <span>{p.name}</span>
                        <span>{p.wins}</span>
                    </li>
                ))}
                <h3> 타자 타율 TOP3</h3>
                <div className={styles.navContainer}>
                    <Link to="/playerStats/battersStats" className={styles.navLink}>타자 기록 전체보기</Link>
                </div>
                <li className="header">
                    <span>순위</span>
                    <span>팀</span>
                    <span>선수명</span>
                    <span>타율</span>
                </li>
                {topBatters.map((b, idx) => (
                    <li key={b.id}>
                        <span>{idx+1}</span>
                        <span>{b.teams}</span>
                        <span>{b.name}</span>
                        <span>{b.avg}</span>
                    </li>
                ))}
                
        </Layout>
    )
}

export default PlayerStats