import {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout"
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./batters.module.scss";
import axios from "axios";

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
    const [loading, setLoading] = useState(false);
    const [batters, setBatters] = useState<Batter[]>([]);
    
    const fetchAllBatters = async () => {
    try {
        setLoading(true);
        const res = await axios.get<Batter[]>("/api/player/allPlayers");
        setBatters(res.data);
        console.log("전체 선수 데이터:", res.data);
        } catch (error) {
        console.error("전체 선수 데이터 가져오기 오류", error);
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        fetchAllBatters();
    }, []);
    const handleSearch = async (keyword: string, criteria: string) => {
        console.log("검색기준: ", criteria, "Batters 검색:", keyword);
        if (!keyword) {
            // 검색어 없으면 전체 선수 다시 불러오기
            fetchAllBatters();
            return;
        }
        const searchSetUrl = "/api/player/searchPlayers?";
        const query = `type=${encodeURIComponent(criteria)}&keyword=${encodeURIComponent(keyword)}`;
        try{
            setLoading(true);
            const res = await axios.get<Batter[]>(
                searchSetUrl + query
            );
            setLoading(false);
            console.log("API 응답:", res.data);  
            setBatters(res.data);
        } catch(error) {
            console.error('데이터 가져오기 오류', error);
            return []
        }
    };

    return (
        <Layout>
        <h2> 타자 기록</h2>
        
        <SearchBar 
        criteriaOptions={[
            { label: "이름", value: "name" },
            { label: "포지션", value: "position" },
            { label: "팀", value: "teams" },
        ]}
        onSearch={(keyword, criteria) => handleSearch(keyword, criteria)}/>
        
        {loading && <p>로딩 중...</p>}

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
            {batters
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p) => (
                <tr key={p.id}>
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
    </Layout>
    )
}
export default BatterStats