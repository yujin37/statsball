package com.statsball.statsball_service.controller;

import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PlayerRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }

    @GetMapping
    public List<Player> allPlayers() {
        return playerRepository.findAll();
    }
}
