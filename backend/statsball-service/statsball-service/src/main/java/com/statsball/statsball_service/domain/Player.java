package com.statsball.statsball_service.domain;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String teams;
    private String name;
    private String position;
    private Double avg;
    private Integer game;
    private Integer totalplate;
    private Integer atbats;
    private Integer runs_scored;
    private Integer hits;
    private Integer doubles_hits;
    private Integer triples_hits;
    private Integer home_runs;
    private Integer total_bases;
    private Integer runs_batted_in;
    private Integer stolen_bases;
    private Integer caught_stealing;
    private Integer sacrifice_hits;
    private Integer sacrifice_flies;
    private Integer walks;
    private Integer intentional_walks;
    private Integer hit_by_pitch;
    private Integer strikeouts;
    private Integer double_plays;
    private Double slugging_percent;
    private Double on_base_percent;
    private Integer errors;
    private Double stolen_base_percent;
    private Double bbk;
    private Double slugging_per_hit;
    private Integer multi_hits;
    private Double ops;
    private Double avg_with_runners;
    private Double pinch_hitter_avg;

    public Player(String name, String teams, String position) {
        this.name = name;
        this.teams = teams;
        this.position = position;
    }

    public Player() {}

}
