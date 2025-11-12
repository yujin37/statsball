package com.statsball.statsball_service.service;

import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PlayerRepository;
import java.util.ArrayList;
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
    public List<Player> getSearchPlayers(String type, String keyword) {
        if(type == null && keyword == null) {
            return playerRepository.findAll();
        }
        return findPlayersByTypeAndKeyword(type, keyword);
    }
    private List<Player> findPlayersByTypeAndKeyword(String type, String keyword) {
        return switch (type) {
            case ("name") -> playerRepository.findByNameContaining(keyword);
            case ("teams") -> playerRepository.findByTeamsContaining(keyword);
            case ("position") -> playerRepository.findByPositionContaining(keyword);
            default -> new ArrayList<>();
        };
    }
}
