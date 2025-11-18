import styles from './Header.module.scss'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className = {styles.contents}>
                <div>
                    <h1> Statsball</h1>
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            팀 기록
                        </li>

                        <li>
                            <Link to="/playerStats" className={styles.navLink} >선수 기록</Link>
                        </li>

                        <li>
                            팀
                        </li>

                        <li>
                            <Link to ="/playerInfo" className={styles.navLink} > 선수 </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header