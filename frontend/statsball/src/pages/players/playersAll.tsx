import { Link } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import styles from "./playersAll.module.scss"
import {useEffect, useState} from "react";
import axios from "axios";
interface Batter {
    id: number;
    teams: string;
    name: string;
    game: number;
    avg: number;
    ops: number;
}

interface Pitcher {
    id: number;
    teams: string;
    name: string;
    game: number;
    era: number;
}
const PlayerInfo = () => {
    const [newBatters, setNewBatters] = useState<Batter[]>([]);
    const [newPitchers, setNewPitchers] = useState<Pitcher[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchNewPitcher = async() => {
            try{
                setLoading(true)
                const res = await axios.get<Pitcher[]> (
                    "api/Ranking/pitcher/newPitchers"

                );
                setNewPitchers(res.data)
            } catch(error) {
                console.error('데이터 가져오기 오류', error);
                return []
            }
        }
        const fetchNewPlayer = async() => {
            try {
                setLoading(true);
                const res = await axios.get<Batter[]> (
                    "api/Ranking/player/newPlayers"
                );
                setNewBatters(res.data);
            } catch(error) {
                console.error('데이터 가져오기 오류', error);
                return []
            }
        }
        fetchNewPitcher();
        fetchNewPlayer();
    }, [])
    return (
        <Layout>
            <h2>전체 선수 정보</h2>
            <h3> 새로 업데이트 된 투수 </h3>
            <div className={styles.navContainer}>
            <Link to = "/playerInfo/pitcherInfo" className={styles.navLink}> 투수 전체보기 </Link>
            </div>
            <li className="header">
                <span>순위</span>
                <span>팀</span>
                <span>선수명</span>
                <span>경기수</span>
                <span>ERA</span>
            </li>
            {newPitchers.map((p, idx) => (
                <li key={p.id}>
                    <span>{idx+1}</span>
                    <span>{p.teams}</span>
                    <span>{p.name}</span>
                    <span>{p.game}</span>
                    <span>{p.era}</span>
                </li>
            ))}
            <h3> 새로 업데이트 된 타자</h3>
            <div className={styles.navContainer}>
            <Link to = "/playerInfo/batterInfo" className={styles.navLink}> 타자 전체 보기</Link>
            </div>
            <li className="header">
                <span>순위</span>
                <span>팀</span>
                <span>선수명</span>
                <span>게임</span>
                <span>타율</span>
                <span>OPS</span>
            </li>
            {newBatters.map((b,idx) => (
                <li key={b.id}>
                    <span>{idx+1}</span>
                    <span>{b.teams}</span>
                    <span>{b.name}</span>
                    <span>{b.game}</span>
                    <span>{b.avg}</span>
                    <span>{b.ops}</span>
                </li>
            
            ))}
        </Layout>
    )
}

export default PlayerInfo