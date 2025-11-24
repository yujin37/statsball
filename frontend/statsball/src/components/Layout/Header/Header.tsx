import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import logo from "../../../assets/Statsball_logo_small.png";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className = {styles.contents}>
                <Link to="/" className={styles.logoWrapper}>
                    <img src={logo} alt="Statsball 로고" className={styles.logo} />
                    <h1> Statsball </h1>
                </Link>

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