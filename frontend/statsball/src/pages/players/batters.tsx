import Layout from "../../components/Layout/Layout"
import {useEffect, useState} from "react";
import axios from "axios";
import style from "./batters.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";

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
    number: number;
}

const BatterInfo = () => {

    const  [tab, setTab] = useState(0)
    const [batters, setBatters] = useState<Batter[]>([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(false); 
    const [currentType, setCurrentType] = useState("타자 정보");
    const selectTabBatter = (index: number) => {
        setTab(index);
    }

    const navigate = useNavigate();
    
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
    }}

    useEffect(() => {
        fetchBatters(rule);
        }, [rule]);
    
    const handleBatters = (id: number) => {
        navigate(`/playerInfo/batterInfo/batterDetail?id=${id}`);
    };

    return (
        <Layout>
            <div className={style.navWrapper}>
                <ul className={style.breadcrumb}>
                    <li>선수 정보</li>
                    <li className={style.separator}>&gt;</li>
                    <li 
                    className={style.currentType}
                    onClick={() => setView(!view)}
                    >
                    {currentType} {view ? "⌃" : "⌄"}
                    </li>
                </ul>

                {view && (
                    <Dropdown
                    items={[
                        { label: "타자 정보", to: "/playerInfo/batterInfo" },
                        { label: "투수 정보", to: "/playerInfo/pitcherInfo" }
                    ]}
                    onSelect={() => setView(false)}
                    />
                )}

            </div>
            <h2> 타자 정보</h2>
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
            <div className={style.batterCardContainer}>
                {batters
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((p) => (
                    <div className={style.batterCard} key={p.id}
                             onClick={() => handleBatters(p.id)} >
                        <div className={style.batterInfo}>
                        <div className={style.team}>{p.teams}</div>
                        <div className={style.number}>{p.number}</div>
                        <div className={style.name}>{p.name}</div>
                        <div className={style.position}>{p.position}</div>
                        </div>
                    </div>
                ))}
            </div>
        
            
        </div>
        </Layout>
    )
}

export default BatterInfo