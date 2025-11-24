package com.statsball.statsball_service.repository;

import com.statsball.statsball_service.domain.TeamRanking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRankingRepository extends JpaRepository<TeamRanking, Integer> {
    List<TeamRanking> findAll();
}