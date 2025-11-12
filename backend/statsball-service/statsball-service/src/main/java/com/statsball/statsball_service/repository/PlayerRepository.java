package com.statsball.statsball_service.repository;


import com.statsball.statsball_service.domain.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNameContaining(String name);
    List<Player> findByTeamsContaining(String teams);
    List<Player> findByPositionContaining(String position);

}