import Layout from "../../components/Layout/Layout"
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

interface Pitcher {
    teams: string;
    name: string;
    era: number;
    game: number;
    complete_game: number;
    shutouts: number;
    wins: number;
    losses: number;
    saves: number;
    holds: number;
    winning_percent: number;
    player_cnt: number;
    number_of_pitches: number;
    innings: string;
    single_hits: number;
    double_hits: number;
    triple_hits: number;
    home_runs: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    walks: number;
    hit_walks: number;
    strikeouts: number;
    wild_pitch: number;
    balk: number;
    runs: number;
    earned_runs: number;
    blown_save: number;
    whip: number;
    hits_percent: number;
    qs: number;
    number: number;
}
const PitchersDetail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); 
    const [pitcher, setPitcher] = useState<Pitcher | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBatter = async () => {
            try {
                const res = await axios.get<Pitcher[]>(`/api/pitcher/detailPitcher?id=${encodeURIComponent(id)}`);
                setPitcher(res.data[0]);
            } catch (err) {
                console.error("데이터 가져오기 오류", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBatter();
    }, [id]);
    if (loading) return <Layout><p>로딩중...</p></Layout>;
    if (!pitcher) return <Layout><p>선수를 찾을 수 없습니다.</p></Layout>;

    return (
        <Layout>
            <h2> 투수 상세 정보</h2>
            <h3>{pitcher.name}</h3>
            <h4>주요 기록</h4>  
            <table>
                <thead>
                    <tr>
                        <th>방어율</th>
                        <th>경기</th>
                        <th>완투</th>
                        <th>완봉</th>
                        <th>승</th>
                        <th>패</th>
                        <th>세이브</th>
                        <th>홀드</th>
                        <th>승률</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{pitcher.era}</td>
                        <td>{pitcher.game}</td>
                        <td>{pitcher.complete_game}</td>
                        <td>{pitcher.shutouts}</td>
                        <td>{pitcher.wins}</td>
                        <td>{pitcher.losses}</td>
                        <td>{pitcher.saves}</td>
                        <td>{pitcher.holds}</td>
                        <td>{pitcher.winning_percent}</td>
                    </tr>
                </tbody>
            </table>
            <h4>투구 기록</h4>
            <table>
                <tbody>
                    <tr><th>타자</th><td>{pitcher.player_cnt}</td></tr>
                    <tr><th>투구수</th><td>{pitcher.number_of_pitches}</td></tr>
                    <tr><th>이닝</th><td>{pitcher.innings}</td></tr>
                    <tr><th>피안타</th><td>{pitcher.single_hits}</td></tr>
                    <tr><th>2루타</th><td>{pitcher.double_hits}</td></tr>
                    <tr><th>3루타</th><td>{pitcher.triple_hits}</td></tr>
                    <tr><th>피홈런</th><td>{pitcher.home_runs}</td></tr>
                    <tr><th>볼넷</th><td>{pitcher.walks}</td></tr>
                    <tr><th>4사구</th><td>{pitcher.hit_walks}</td></tr>
                    <tr><th>탈삼진</th><td>{pitcher.strikeouts}</td></tr>
                </tbody>
            </table>
            <h4>상황별 · 특수 기록</h4>
            <table>
                <tbody>
                    <tr><th>희타</th><td>{pitcher.sacrifice_hits}</td></tr>
                    <tr><th>희비</th><td>{pitcher.sacrifice_flies}</td></tr>
                    <tr><th>폭투</th><td>{pitcher.wild_pitch}</td></tr>
                    <tr><th>보크</th><td>{pitcher.balk}</td></tr>
                    <tr><th>실점</th><td>{pitcher.runs}</td></tr>
                    <tr><th>자책</th><td>{pitcher.earned_runs}</td></tr>
                    <tr><th>블론세이브</th><td>{pitcher.blown_save}</td></tr>
                    <tr><th>QS</th><td>{pitcher.qs}</td></tr>
                </tbody>
            </table>
            <h4>보조지표</h4>
            <table>
                <tbody>
                    <tr><th>WHIP</th><td>{pitcher.whip}</td></tr>
                    <tr><th>피안타율</th><td>{pitcher.hits_percent}</td></tr>
                </tbody>
            </table>
        </Layout>

    )
}

export default PitchersDetail;