package com.statsball.statsball_service.controller;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.service.PitcherService;
import com.statsball.statsball_service.service.PlayerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(originPatterns = "http://168.107.37.97:80/")
@Tag(name="Ranking")
@RestController
@RequestMapping("/api/Ranking")
public class RankingController {

    private final PitcherService pitcherService;
    private final PlayerService playerService;

    public RankingController(PitcherService pitcherService, PlayerService playerService) {
        this.pitcherService = pitcherService;
        this.playerService = playerService;
    }

    @GetMapping("/player/topPlayers")
    public List<Player> getTopAvgPlayers(@RequestParam(value = "type") String type) {
        return playerService.getTopPlayers(type);
    }

    @GetMapping("/pitcher/topPitchers")
    public List<Pitcher> getTopWinPitchers(@RequestParam(value = "type") String type) {
        return pitcherService.getTopPitchers(type);
    }

    @GetMapping("/player/newPlayers")
    public List<Player> getNewPlayers() {
        return playerService.getNewPlayers();
    }

    @GetMapping("/pitcher/newPitchers")
    public List<Pitcher> getNewPitchers() {
        return pitcherService.getNewPitchers();
    }
}
