import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import styles from "./teamStats.module.scss";

interface TeamRanking {
  rank: number;
  team: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  win_rate: number;
  gap: number;
  streak: string;
  last10: string;
}

interface TeamStats {
  rank: number;
  team: string;
  avg: number;
  games: number;
  atbats: number;
  hits: number;
  doubles: number;
  triples: number;
  home_runs: number;
  stolen_bases: number;
  runs: number;
  innings: number;
  runs_allowed: number;
}

const TeamStats = () => {
    const [activeTab, setActiveTab] = useState<"ranking" | "stats">("ranking");
    const [rankings, setRankings] = useState<TeamRanking[]>([]);
    const [stats, setStats] = useState<TeamStats[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true);
            try {
                const res = await axios.get<TeamRanking[]>("api/TeamRanking/teamRankings");
                setRankings(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await axios.get<TeamStats[]>("api/TeamStats/teamStats");
                setStats(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRankings();
        fetchStats();
    }, []);

    return (
        <Layout>
            <h2>팀 기록</h2>
            <div className={styles.tabHeader}>
                <button
                className={activeTab === "ranking" ? styles.active: ""}
                onClick={() => setActiveTab("ranking")}
                > 팀 순위 </button>
                <button
                className={activeTab === "stats" ? styles.active: ""}
                onClick={() => setActiveTab("stats")}
                > 팀 기록 </button>
            </div>

            {loading && <p>로딩 중...</p>}

      {activeTab === "ranking" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순위</th>
              <th>팀명</th>
              <th>경기수</th>
              <th>승</th>
              <th>패</th>
              <th>무</th>
              <th>승률</th>
              <th>승차</th>
              <th>연속</th>
              <th>최근10경기</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((t) => (
              <tr key={t.rank}>
                <td>{t.rank}</td>
                <td>{t.team}</td>
                <td>{t.games}</td>
                <td>{t.wins}</td>
                <td>{t.losses}</td>
                <td>{t.draws}</td>
                <td>{t.win_rate}</td>
                <td>{t.gap}</td>
                <td>{t.streak}</td>
                <td>{t.last10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "stats" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순위</th>
              <th>팀명</th>
              <th>타율</th>
              <th>경기수</th>
              <th>타수</th>
              <th>안타</th>
              <th>2루타</th>
              <th>3루타</th>
              <th>홈런</th>
              <th>도루</th>
              <th>득점</th>
              <th>이닝</th>
              <th>실점</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((t) => (
              <tr key={t.rank}>
                <td>{t.rank}</td>
                <td>{t.team}</td>
                <td>{t.avg}</td>
                <td>{t.games}</td>
                <td>{t.atbats}</td>
                <td>{t.hits}</td>
                <td>{t.doubles}</td>
                <td>{t.triples}</td>
                <td>{t.home_runs}</td>
                <td>{t.stolen_bases}</td>
                <td>{t.runs}</td>
                <td>{t.innings}</td>
                <td>{t.runs_allowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </Layout>
    )
}

export default TeamStats;