package com.statsball.statsball_service.repository;


import com.statsball.statsball_service.domain.Player;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNameContaining(String name);
    List<Player> findByTeamsContaining(String teams);
    List<Player> findByPositionContaining(String position);
    List<Player> findByPositionIn(List<String> groupPosition);
    @Query(value="SELECT * FROM players WHERE game >= 10 ORDER BY avg DESC", nativeQuery = true)
    List<Player> findTopOrderByAvgDesc();
    Optional<Player> findById(Long id);
    List<Player> findTop5ByOrderByIdDesc();
}