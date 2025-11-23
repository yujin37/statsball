import { Link } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import styles from "./players.module.scss"

const PlayerStats = () => {
    return (
        <Layout>
            <h2>선수 기록</h2>
                <ul>
                    <li>투수 승 TOP3</li>
                </ul>
                <Link to="/playerStats/pitchersStats" className={styles.navLink}>투수 기록</Link>
                
                <ul>
                    <li> 타자 타율 TOP3</li>
                </ul>
                <Link to="/playerStats/battersStats" className={styles.navLink}>타자 기록</Link>
        </Layout>
    )
}

export default PlayerStats