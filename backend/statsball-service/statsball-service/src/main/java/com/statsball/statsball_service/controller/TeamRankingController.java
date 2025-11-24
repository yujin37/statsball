package com.statsball.statsball_service.controller;

import com.statsball.statsball_service.domain.TeamRanking;
import com.statsball.statsball_service.service.TeamRankingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(originPatterns = "http://168.107.37.97:80/")
@Tag(name="TeamRanking")
@RestController
@RequestMapping("/api/TeamRanking")
public class TeamRankingController {
    private final TeamRankingService teamRankingservice;

    public TeamRankingController(TeamRankingService teamRankingservice) {
        this.teamRankingservice = teamRankingservice;
    }

    @GetMapping("/teamRankings")
    public List<TeamRanking> getTeamRankings() {
        return teamRankingservice.getAllRankings();
    }

}
