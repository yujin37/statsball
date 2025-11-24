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
        const fetchTopPitcher = async() => {
            try{
                setLoading(true)
                const res = await axios.get<Pitcher[]>(
                    "/api/pitcher/topWinPitchers"
                );
                setTopPitchers(res.data);
            } catch(error) {
                console.error(`데이터 가져오기 오류`, error);
                return []
            }
        }
        const fetchTopBatter = async() => {
            try{
                setLoading(true)
                const res = await axios.get<Pitcher[]>(
                    "/api/pitcher/topAvgBatters"
                );
                setTopPitchers(res.data);
            } catch(error) {
                console.error(`데이터 가져오기 오류`, error);
                return []
            }
        }
    })
    return (
        <Layout>
            <h2>선수 기록</h2>
                <h3>투수 최다 승 TOP3</h3>
                {topPitchers.map((p, idx) => (
                    <li>
                        <span>{idx+1}</span>
                        <span>{p.teams}</span>
                        <span>{p.name}</span>
                        <span>{p.wins}</span>
                    </li>
                ))}
                <Link to="/playerStats/pitchersStats" className={styles.navLink}>투수 기록</Link>
                
                <h3> 타자 타율 TOP3</h3>
                {topBatters.map((b, idx) => (
                    <li>
                        <span>{idx+1}</span>
                        <span>{b.teams}</span>
                        <span>{b.name}</span>
                        <span>{b.avg}</span>
                    </li>
                ))}
                <Link to="/playerStats/battersStats" className={styles.navLink}>타자 기록</Link>
        </Layout>
    )
}

export default PlayerStats