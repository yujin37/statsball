import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import style from "./pitchers.module.scss"
import axios from "axios";

interface PitcherTab {
  tabName: string;
  rule: string;
}

const pitcherTabList: PitcherTab[] = [
        {tabName:'전체', rule: 'allPitcher'},
        {tabName:'선발 투수', rule: 'startingPitcher'},
        {tabName:'불펜 투수', rule: 'bullpenPitcher'}, 
        {tabName:'마무리 투수', rule: 'closingPitcher'},
        {tabName:'그외', rule: 'else'}
];

interface Pitcher {
    id: number;
    teams: string;
    name: string;
    era: number;
    game: number;
    wins: number;
    losses: number;
    saves: number;
    holds: number 
    inning: string;
    whip: number;
    qs: number;
}

const PitchStats = () => {
    const  [tab, setTab] = useState(0)
    const [pitchers, setPitchers] = useState<Pitcher[]>([]);
    const [loading, setLoading] = useState(false);
    const selectTabPitcher = (index: number) => {
        setTab(index);
    }

    const rule = pitcherTabList[tab].rule;

    const setUrl = "/api/pitcher/rolePitchers?rule=";

    const fetchPitchers = async (rule: string) => {
        try {
            setLoading(true);
            const res = await axios.get<Pitcher[]>(
                setUrl + encodeURIComponent(rule)
            );
        setPitchers(res.data);
        } catch(error) {
            console.error('데이터 가져오기 오류', error);
            return []
        }
    } 

    useEffect(() => {
        fetchPitchers(rule);
        }, [rule]);
    
        return (
        <Layout>
        <h2>투수 기록</h2>

        <div className="tabContainer">
            <ul>
                {pitcherTabList.map((x, index) => (
                    <li
                    key = {index}
                    onClick={() => selectTabPitcher(index)}
                    className={tab === index ? "on": ""}
                    >
                        {x.tabName}
                    </li>
                ))}
            </ul>
        </div>
        <div className="tabContent">
            {pitchers.map(p => (
                <table>
                    <thead>
                        <tr>
                            <th>팀</th>
                            <th>이름</th>
                            <th>ERA</th>
                            <th>출장 게임 수</th>
                            <th>승</th>
                            <th>패</th>
                            <th>세이브</th>
                            <th>홀드</th>
                            <th>이닝</th>
                            <th>WHIP</th>
                            <th>QS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key = {p.id}>
                            <td>{p.teams}</td>
                            <td>{p.name}</td>
                            <td>{p.era}</td>
                            <td>{p.game}</td>
                            <td>{p.wins}</td>
                            <td>{p.losses}</td>
                            <td>{p.saves}</td>
                            <td>{p.holds}</td>
                            <td>{p.inning}</td>
                            <td>{p.whip}</td>
                            <td>{p.qs}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
        </Layout>
    )
}

export default PitchStats