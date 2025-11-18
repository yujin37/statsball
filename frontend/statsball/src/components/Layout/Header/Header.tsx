import styles from './Header.module.scss'
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
                            선수 기록
                        </li>

                        <li>
                            팀
                        </li>

                        <li>
                            선수
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header