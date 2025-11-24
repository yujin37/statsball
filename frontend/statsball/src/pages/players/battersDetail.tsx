import Layout from "../../components/Layout/Layout"
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

interface Batter {
    teams: string;
    name: string;
    position: string;
    avg: number;
    game: number;
    totalplate: number;
    atbats: number;
    runs_scored: number;
    hits: number;
    doubles_hits: number;
    triples_hits: number;
    home_runs: number;
    total_bases: number;
    runs_batted_in: number;
    stolen_bases: number;
    caught_stealing: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    walks: number;
    intentional_walks: number;
    hit_by_pitch: number;
    strikeouts: number;
    double_plays: number;
    slugging_percent: number;
    on_base_percent: number;
    errors: number;
    stolen_base_percent: number;
    bbk: number;
    slugging_per_hit: number;
    multi_hits: number;
    ops: number;
    avg_with_runners: number;
    pinch_hitter_avg: number;
    number: number;
}
const BattersDetail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); 
    const [batter, setBatter] = useState<Batter | null>(null);
    const [loading, setLoading] = useState(true);

    const setUrl = "/api/player/detailPlayer?id=";

    useEffect(() => {
        if (!id) return;

        const fetchBatter = async () => {
            try {
                const res = await axios.get<Batter[]>(`/api/player/detailPlayer?id=${encodeURIComponent(id)}`);
                setBatter(res.data[0]);
            } catch (err) {
                console.error("데이터 가져오기 오류", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBatter();
    }, [id]);
    if (loading) return <Layout><p>로딩중...</p></Layout>;
    if (!batter) return <Layout><p>선수를 찾을 수 없습니다.</p></Layout>;

    return (
        <Layout>
            <h2> 타자 상세 정보</h2>
            <h3>{batter.name}</h3>
            <h4>주요 성적</h4>
            <table>
                <thead>
                    <tr>
                        <th>타율</th>
                        <th>경기</th>
                        <th>타수</th>
                        <th>안타</th>
                        <th>홈런</th>
                        <th>득점</th>
                        <th>타점</th>
                        <th>도루</th>
                        <th>도루 실패</th>
                        <th>OPS</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{batter.avg}</td>
                        <td>{batter.game}</td>
                        <td>{batter.atbats}</td>
                        <td>{batter.hits}</td>
                        <td>{batter.home_runs}</td>
                        <td>{batter.runs_scored}</td>
                        <td>{batter.runs_batted_in}</td>
                        <td>{batter.stolen_bases}</td>
                        <td>{batter.caught_stealing}</td>
                        <td>{batter.ops}</td>
                    </tr>
                </tbody>
            </table>

            <h4>장타 · 장타율</h4>
            <table>
            <tbody>
                <tr><th>2루타</th><td>{batter.doubles_hits}</td></tr>
                <tr><th>3루타</th><td>{batter.triples_hits}</td></tr>
                <tr><th>홈런</th><td>{batter.home_runs}</td></tr>
                <tr><th>총루타</th><td>{batter.total_bases}</td></tr>
                <tr><th>장타율</th><td>{batter.slugging_percent}</td></tr>
                <tr><th>안타×장타율</th><td>{batter.slugging_per_hit}</td></tr>
            </tbody>
            </table>


            <h4>출루 · 선구안</h4>
            <table>
            <tbody>
                <tr><th>볼넷</th><td>{batter.walks}</td></tr>
                <tr><th>고의4구</th><td>{batter.intentional_walks}</td></tr>
                <tr><th>사구</th><td>{batter.hit_by_pitch}</td></tr>
                <tr><th>삼진</th><td>{batter.strikeouts}</td></tr>
                <tr><th>BB/K</th><td>{batter.bbk}</td></tr>
                <tr><th>출루율</th><td>{batter.on_base_percent}</td></tr>
            </tbody>
            </table>


            <h4>주루 · 상황별</h4>
            <table>
            <tbody>
                <tr><th>도루</th><td>{batter.stolen_bases}</td></tr>
                <tr><th>도루 실패</th><td>{batter.caught_stealing}</td></tr>
                <tr><th>도루 성공률</th><td>{batter.stolen_base_percent}</td></tr>
                <tr><th>희타</th><td>{batter.sacrifice_hits}</td></tr>
                <tr><th>희비</th><td>{batter.sacrifice_flies}</td></tr>
                <tr><th>실책</th><td>{batter.errors}</td></tr>
                <tr><th>병살</th><td>{batter.double_plays}</td></tr>
                <tr><th>멀티히트</th><td>{batter.multi_hits}</td></tr>
                <tr><th>득점권 타율</th><td>{batter.avg_with_runners}</td></tr>
                <tr><th>대타 타율</th><td>{batter.pinch_hitter_avg}</td></tr>
            </tbody>
            </table>



        </Layout>

    )
}

export default BattersDetail;