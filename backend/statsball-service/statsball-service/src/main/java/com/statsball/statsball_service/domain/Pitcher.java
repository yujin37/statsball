package com.statsball.statsball_service.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="pitchers")
public class Pitcher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String teams;
    private String name;
    private Double era;
    private Integer game;
    private Integer complete_game;
    private Integer shutouts;
    private Integer wins;
    private Integer losses;
    private Integer saves;
    private Integer holds;
    private Double winning_percent;
    private Integer player_cnt;
    private Integer number_of_pitches;
    private String innings;
    private Integer single_hits;
    private Integer double_hits;
    private Integer triple_hits;
    private Integer home_runs;
    private Integer sacrifice_hits;
    private Integer sacrifice_flies;
    private Integer walks;
    private Integer hit_walks;
    private Integer strikeouts;
    private Integer wild_pitch;
    private Integer balk;
    private Integer runs;
    private Integer earned_runs;
    private Integer blown_save;
    private Double whip;
    private Double hits_percent;
    private Integer qs;

    public Pitcher(String name, String team, int qs, int holds, int saves) {
        this.name = name;
        this.teams = team;
        this.qs = qs;
        this.holds = holds;
        this.saves = saves;
    }

    public Pitcher() {}
}
