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
    private Integer atbats;
    private Integer totalplate;
    private Integer runsscored;
    private Integer singlehits;
    private Integer doubleshits;
    private Integer tripleshits;
    private Integer homeruns;
    private Integer totalbases;
    private Integer runsbattedin;
    private Integer stolenbases;
    private Integer caughtstealing;
    private Integer sacrificehits;
    private Integer sacrificeflies;
    private Integer walks;
    private Integer intentionalwalks;
    private Integer hitbypitch;
    private Integer strikeouts;
    private Integer doubleplays;
    private Double sluggingpercent;
    private Double onbasepercent;
    private Integer error;
    private Double stolenbasepercent;
    private Double bbk;
    private Double hits;
    private Integer multihits;
    private Double ops;
    private Double battingavg;
    private Double pinchhitteravg;

    public Player(String name, String teams) {
        this.name = name;
        this.teams = teams;
    }

}
