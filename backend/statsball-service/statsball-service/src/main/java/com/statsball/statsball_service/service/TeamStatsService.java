package com.statsball.statsball_service.service;
import com.statsball.statsball_service.domain.TeamStat;
import com.statsball.statsball_service.repository.TeamStatsRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeamStatsService {
    private final TeamStatsRepository repository;

    public TeamStatsService(TeamStatsRepository repository) {
        this.repository = repository;
    }

    public List<TeamStat> getAllTeamStats() {
        return repository.findAllByOrderByRankAsc();
    }
}
