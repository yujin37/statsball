import { Link } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import styles from "./playersAll.module.scss"
const PlayerInfo = () => {
    return (
        <Layout>
            <h2>전체 선수 정보</h2>
            <h3> 새로 업데이트 된 투수 </h3>
            <div className={styles.navContainer}>
            <Link to = "/playerInfo/pitcherInfo" className={styles.navLink}> 투수 전체보기 </Link>
            </div>
            <h3> 새로 업데이트 된 타자</h3>
            <div className={styles.navContainer}>
            <Link to = "/playerInfo/batterInfo" className={styles.navLink}> 타자 전체 보기</Link>
            </div>
        </Layout>
    )
}

export default PlayerInfo