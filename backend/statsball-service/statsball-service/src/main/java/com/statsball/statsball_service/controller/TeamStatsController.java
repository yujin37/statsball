package com.statsball.statsball_service.controller;

import com.statsball.statsball_service.domain.TeamStat;
import com.statsball.statsball_service.service.TeamRankingService;
import com.statsball.statsball_service.service.TeamStatsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(originPatterns = "http://168.107.37.97:80/")
@Tag(name="TeamStats")
@RestController
@RequestMapping("/api/TeamStats")
public class TeamStatsController {
    private final TeamStatsService teamStatsService;

    public TeamStatsController(TeamRankingService teamRankingService, TeamStatsService teamStatsService) {
        this.teamStatsService = teamStatsService;
    }

    @GetMapping("teamStats")
    public List<TeamStat> getTeamStats() {
        return teamStatsService.getAllTeamStats();
    }
}
