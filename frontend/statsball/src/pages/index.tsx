import Layout from "../components/Layout/Layout"
import main_logo from "../assets/Statsball_logo_long_small.png";
import styles from "./index.module.scss";
const HomePage = () => {
    return (
        <Layout>
            <h2> Home </h2>
            <div className={styles.homeContainer}>
                <img src={main_logo} alt="Statsball 로고" className={styles.logo} />
                <p className={styles.intro}>
                Statsball은 프로야구 선수와 팀 기록을 한눈에 확인할 수 있는 서비스입니다.<br />
                상단 메뉴를 이용해 선수 기록, 팀 기록, 선수, 팀 페이지로 이동할 수 있습니다.
                </p>
            </div>
        </Layout>
    )
}

export default HomePage