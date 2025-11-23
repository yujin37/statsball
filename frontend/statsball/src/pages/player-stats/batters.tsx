import {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout"
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./batters.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
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
  
  const [sortConfig, setSortConfig] = useState<{key: string, direction: "asc" | "desc"}>({
      key: "name",
      direction: "asc"
  })
  
  const [view, setView] = useState(false); 
  const [currentType, setCurrentType] = useState("타자 정보");

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
  const sortedBatters = [...batters].sort((a, b) => {
  const {key, direction} = sortConfig;
  const order = direction === "asc" ? 1: -1;

  const aVal = a[key as keyof Batter];
  const bVal = b[key as keyof Batter];

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
        <div className={style.navWrapper}>
          <ul className={style.breadcrumb}>
            <li>선수 기록</li>
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
                { label: "타자 정보", to: "/playerStats/battersStats" },
                { label: "투수 정보", to: "/playerStats/pitchersStats" }
              ]}
              onSelect={() => setView(false)}
            />
          )}

        </div>
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
              <th onClick={() => handleSort("teams")}>팀{renderIcon("teams")}</th>
              <th onClick={() => handleSort("name")}>이름{renderIcon("name")}</th>
              <th onClick={() => handleSort("position")}>포지션{renderIcon("position")}</th>
              <th onClick={() => handleSort("avg")}>타율{renderIcon("avg")}</th>
              <th onClick={() => handleSort("game")}>출장 경기 수{renderIcon("game")}</th>
              <th onClick={() => handleSort("atbats")}>타수{renderIcon("atbats")}</th>
              <th onClick={() => handleSort("hits")}>안타{renderIcon("hits")}</th>
              <th onClick={() => handleSort("home_runs")}>홈런{renderIcon("home_runs")}</th>
              <th onClick={() => handleSort("runs_scored")}>득점{renderIcon("runs_scored")}</th>
              <th onClick={() => handleSort("runs_batted_in")}>타점{renderIcon("runs_batted_in")}</th>
              <th onClick={() => handleSort("stolen_bases")}>도루{renderIcon("stolen_bases")}</th>
              <th onClick={() => handleSort("caught_stealing")}>도루실패{renderIcon("caught_stealing")}</th>
              <th onClick={() => handleSort("strikeouts")}>삼진{renderIcon("strikeouts")}</th>
              <th onClick={() => handleSort("wals")}>4사구{renderIcon("walks")}</th>
              <th onClick={() => handleSort("on_base_percent")}>출루율{renderIcon("on_base_percent")}</th>
              <th onClick={() => handleSort("ops")}>OPS{renderIcon("ops")}</th>
              <th onClick={() => handleSort("avg_with_runners")}>득점권 타율{renderIcon("avg_with_runners")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedBatters.map((p) => (
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