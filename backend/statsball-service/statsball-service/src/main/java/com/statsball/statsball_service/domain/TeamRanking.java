package com.statsball.statsball_service.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="team_rankings")
public class TeamRanking {
    @Id
    @Column(name="rank")
    private Integer rank;
    private String team;
    private Integer games;
    private Integer wins;
    private Integer losses;
    private Integer draws;
    private Double win_rate;
    private Double gap;
    private String streak;
    private String last10;

    public TeamRanking() {}
}
