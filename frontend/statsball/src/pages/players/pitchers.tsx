import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import style from "./pitchers.module.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    number: number;
}

const PitcherInfo = () => {
    const  [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false);
    const [pitchers, setPitchers] = useState<Pitcher[]>([]);
    const selectTabPitcher = (index: number) => {
        setTab(index);
    }

    const navigate = useNavigate();

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
    
    const handlePitchers = (id: number) => {
        navigate(`/pitcherInfo/pitcherDetail?id=${id}`);
    };

    return (
        <Layout>
            <h2> 투수 정보</h2>
            <div className={style.tabContainer}>
            <ul>
                {pitcherTabList.map((x, index) => (
                    <li
                    key = {index}
                    onClick={() => selectTabPitcher(index)}
                    className={tab === index ? style.active: ""}
                    >
                        {x.tabName}
                    </li>
                ))}
            </ul>
            <div className={style.batterCardContainer}>
                {pitchers
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((p) => (
                    <div className={style.batterCard} key={p.id}
                             onClick={() => handlePitchers(p.id)} >
                        <div className={style.batterInfo}>
                        <div className={style.team}>{p.teams}</div>
                        <div className={style.number}>{p.number}</div>
                        <div className={style.name}>{p.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
}

export default PitcherInfo