package com.statsball.statsball_service.repository;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.domain.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitcherRepository extends JpaRepository<Pitcher, Long> {
    List<Pitcher> findByNameContaining(String name);
    List<Pitcher> findByTeamsContaining(String teams);
}
