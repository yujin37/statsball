import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./pitchers.module.scss"
import axios from "axios";

interface Pitcher {
    id: number;
    teams: string;
    name: string;
    era: number;
    game: number;
    wins: number;
    losses: number;
    saves: number;
    holds: number; 
    innings: string;
    whip: number;
    qs: number;
}

const PitchStats = () => {
    const [pitchers, setPitchers] = useState<Pitcher[]>([]);
    const [loading, setLoading] = useState(false);
    const [originalPitchers, setOriginalPitchers] = useState<Pitcher[]>([]); // 전체 저장용

    const [sortConfig, setSortConfig] = useState<{key: string, direction: "asc" | "desc"}>({
        key: "name",
        direction: "asc"
    })
    /** ✔ 전체 투수 데이터 가져오기 */
    const fetchAllPitchers = async () => {
        try {
            setLoading(true);
            const res = await axios.get<Pitcher[]>("/api/pitcher/allPitchers");
            setPitchers(res.data);
            setOriginalPitchers(res.data);
            console.log("전체 투수 데이터:", res.data);
        } catch (error) {
            console.error("전체 투수 데이터 가져오기 오류", error);
        } finally {
            setLoading(false);
        }
    };

    
    const handleSearch = async (keyword: string, criteria: string) => {
        console.log("검색기준:", criteria, "Pitchers 검색:", keyword);
        if (!keyword.trim()) {
            setPitchers(originalPitchers);
            return;
        }
        const query = `type=${encodeURIComponent(criteria)}&keyword=${encodeURIComponent(keyword)}`;

        try {
            setLoading(true);
            const res = await axios.get<Pitcher[]>(`/api/pitcher/searchPitchers?${query}`);
            console.log("검색 결과:", res.data);
            setPitchers(res.data);
        } catch (error) {
            console.error("검색 오류", error);
        } finally {
            setLoading(false);
        }
    };

    /** ✔ 페이지 로드시 전체 호출 */
    useEffect(() => {
        fetchAllPitchers();
    }, []);

    const sortedPitchers = [...pitchers].sort((a, b) => {
        const {key, direction} = sortConfig;
        const order = direction === "asc" ? 1: -1;

        const aVal = a[key as keyof Pitcher];
        const bVal = b[key as keyof Pitcher];

        if(typeof aVal === "number" && typeof bVal === "number") {
            return (aVal - bVal) * order;
        }
        return aVal.toString().localeCompare(bVal.toString()) * order;
    });

    const handleSort = (key: string) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc":"asc"
        }));
    }

    const renderIcon = (key: string) => {
        if(!sortConfig || sortConfig.key !== key) return "↕"; 
        return sortConfig.direction === "asc"?  "▲" : "▼";
    }
    
    return (
        <Layout>
            <h2>투수 기록</h2>

            <SearchBar
                criteriaOptions={[
                    { label: "이름", value: "name" },
                    { label: "팀", value: "team" },
                ]}
                onSearch={handleSearch}
            />

            <div className={style.tabContainer}>
                <div className={style.tabContent}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("teams")}>팀{renderIcon("teams")}</th>
                                <th onClick={() => handleSort("name")}>이름{renderIcon("name")}</th>
                                <th onClick={() => handleSort("era")}>ERA{renderIcon("era")}</th>
                                <th onClick={() => handleSort("game")}>출장 게임 수{renderIcon("game")}</th>
                                <th onClick={() => handleSort("wins")}>승{renderIcon("wins")}</th>
                                <th onClick={() => handleSort("losses")}>패{renderIcon("losses")}</th>
                                <th onClick={() => handleSort("saves")}>세이브{renderIcon("saves")}</th>
                                <th onClick={() => handleSort("holds")}>홀드{renderIcon("holds")}</th>
                                <th onClick={() => handleSort("innings")}>이닝{renderIcon("innings")}</th>
                                <th onClick={() => handleSort("whip")}>WHIP{renderIcon("whip")}</th>
                                <th onClick={() => handleSort("qs")}>QS{renderIcon("qs")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPitchers.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.teams}</td>
                                        <td>{p.name}</td>
                                        <td>{p.era}</td>
                                        <td>{p.game}</td>
                                        <td>{p.wins}</td>
                                        <td>{p.losses}</td>
                                        <td>{p.saves}</td>
                                        <td>{p.holds}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.whip}</td>
                                        <td>{p.qs}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default PitchStats