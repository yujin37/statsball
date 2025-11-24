package com.statsball.statsball_service.repository;
import com.statsball.statsball_service.domain.TeamStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TeamStatsRepository extends JpaRepository<TeamStat, Integer>{
    List<TeamStat> findAllByOrderByRankAsc();
}
