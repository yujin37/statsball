import {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout"
import style from "./batters.module.scss"
import axios from "axios";

interface BatterTab {
  tabName: string;
  groupPosition: string;
}

const batterTabList: BatterTab[] = [
    {tabName: '전체', groupPosition: 'allBatter'},
    {tabName: '내야수', groupPosition: 'infielder'},
    {tabName: '외야수', groupPosition:'outfielder'},
    {tabName: '포수', groupPosition: 'catcher'}
];

interface Batter {
    id: number;
    teams: string;
    name: string;
    position: string;
    avg: number;
    game: number;
    atbats: number;
    hits: number;
    home_runs: number;
    runs_scored: number;
    runs_batted_in: number;
    stolen_bases: number;
    caught_stealing: number;
    strikeouts: number;
    walks: number;
    on_base_percent: number;
    ops: number;
    avg_with_runners: number;
}
const BatterStats = () => {
    const  [tab, setTab] = useState(0)
    const [batters, setBatters] = useState<Batter[]>([]);
    const [loading, setLoading] = useState(false);
    const selectTabBatter = (index: number) => {
        setTab(index);
    }
    
    const rule = batterTabList[tab].groupPosition;

    const setUrl = "/api/player/locatePlayerPosition?groupPosition=";

    const fetchBatters = async (rule: string) => {
        try {
            setLoading(true);
            const res = await axios.get<Batter[]>(
                setUrl + encodeURIComponent(rule)
            );
        setBatters(res.data);
        } catch(error) {
            console.error('데이터 가져오기 오류', error);
            return []
        }
    } 

    useEffect(() => {
        fetchBatters(rule);
        }, [rule]);
    
    return (
        <Layout>
        <h2> 타자 기록</h2>

        <div className={style.tabContainer}>
            <ul>
                {batterTabList.map((x, index) => (
                    <li
                    key = {index}
                    onClick={() => selectTabBatter(index)}
                    className={tab === index ? style.active: ""}
                    >
                        {x.tabName}
                    </li>
                ))}
            </ul>
            <div className={style.tabContent}>
                <table>
                    <thead>
                        <tr>
                            <th>팀</th>
                            <th>이름</th>
                            <th>포지션</th>
                            <th>타율</th>
                            <th>출장 경기 수</th>
                            <th>타수</th>
                            <th>안타</th>
                            <th>홈런</th>
                            <th>득점</th>
                            <th>타점</th>
                            <th>도루</th>
                            <th>도루실패</th>
                            <th>삼진</th>
                            <th>4사구</th>
                            <th>출루율</th>
                            <th>OPS</th>
                            <th>득점권 타율</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batters.slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(p => (
                            <tr key = {p.id}>
                                <td>{p.teams}</td>
                                <td>{p.name}</td>
                                <td>{p.position}</td>
                                <td>{p.avg}</td>
                                <td>{p.game}</td>
                                <td>{p.atbats}</td>
                                <td>{p.hits}</td>
                                <td>{p.home_runs}</td>
                                <td>{p.runs_scored}</td>
                                <td>{p.runs_batted_in}</td>
                                <td>{p.stolen_bases}</td>
                                <td>{p.caught_stealing}</td>
                                <td>{p.strikeouts}</td>
                                <td>{p.walks}</td>
                                <td>{p.on_base_percent}</td>
                                <td>{p.ops}</td>
                                <td>{p.avg_with_runners}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        
            
        </div>
        </Layout>
    )
}
export default BatterStats