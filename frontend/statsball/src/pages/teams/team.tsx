import Layout from "../../components/Layout/Layout"
import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";
import styles from "./team.module.scss";

//로고 링크
import lg from "../../assets/teamLogo/lgTwins.svg";
import samsung from "../../assets/teamLogo/samsungLions.svg";
import hanwha from "../../assets/teamLogo/hanwhaEagles.svg";
import ssg from  "../../assets/teamLogo/ssgLanders.svg";
import nc from "../../assets/teamLogo/ncDinos.svg";
import kt from "../../assets/teamLogo/ktWiz.svg";
import lotte from "../../assets/teamLogo/lotteGiants.svg";
import kia from "../../assets/teamLogo/kiaTigers.svg";
import doosan from "../../assets/teamLogo/doosanBears.svg";
import kiwoom from "../../assets/teamLogo/kiwoomHeros.svg";
interface Team {
    name: string;
    logo: string;
}
const teams: Team[] = [
  { name: "LG", logo: lg },
  { name: "삼성", logo: samsung },
  { name: "롯데", logo: lotte },
  { name: "한화", logo: hanwha },
  { name: "두산", logo: doosan },
  { name: "NC", logo: nc },
  { name: "KT", logo: kt },
  { name: "키움", logo: kiwoom },
  { name: "KIA", logo: kia },
  { name: "SSG", logo: ssg },
];

const TeamInfo = () => {

    return (
        <Layout>
            <h2> KBO </h2>
            <div className={styles.cardContainer}>
                {teams.map((team) => (
                <div key={team.name} className={styles.teamCard}>
                    <img src={team.logo} alt={`${team.name} 로고`} className={styles.teamLogo} />
                    <p>{team.name}</p>
                </div>
                ))}
            </div>
        </Layout>
    );
};

export default TeamInfo;