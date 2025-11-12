package com.statsball.statsball_service.service;

import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PlayerRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}
