package com.statsball.statsball_service.service;

import com.statsball.statsball_service.domain.TeamRanking;
import com.statsball.statsball_service.repository.TeamRankingRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TeamRankingService {
    private final TeamRankingRepository teamRankingRepository;

    public TeamRankingService(TeamRankingRepository teamRankingRepository) {
        this.teamRankingRepository = teamRankingRepository;
    }

    public List<TeamRanking> getAllRankings() {
        return teamRankingRepository.findAll();
    }
}
