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

    /** ✔ 전체 투수 데이터 가져오기 */
    const fetchAllPitchers = async () => {
        try {
            setLoading(true);
            const res = await axios.get<Pitcher[]>("/api/pitcher/allPlayers");
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
            const res = await axios.get<Pitcher[]>(`/api/pitcher/searchPlayers?${query}`);
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
                            {pitchers
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((p) => (
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