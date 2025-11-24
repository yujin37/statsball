package com.statsball.statsball_service.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "team_stats")
public class TeamStat {
    @Id
    private Integer rank;

    private String team;
    private Double avg;
    private Integer games;
    private Integer atbats;
    private Integer hits;
    private Integer doubles;
    private Integer triples;
    private Integer home_runs;
    private Integer stolen_bases;
    private Integer runs;
    private Double innings;
    private Integer runs_allowed;
}
