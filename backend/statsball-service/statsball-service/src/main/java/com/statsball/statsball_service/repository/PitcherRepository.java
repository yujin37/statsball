package com.statsball.statsball_service.repository;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.domain.Player;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PitcherRepository extends JpaRepository<Pitcher, Long> {
    List<Pitcher> findByNameContaining(String name);
    List<Pitcher> findByTeamsContaining(String teams);
    List<Pitcher> findByQsIsGreaterThanEqual(int qs);
    List<Pitcher> findByHoldsIsGreaterThanEqual(int holds);
    List<Pitcher> findBySavesIsGreaterThanEqual(int saves);
    @Query(value = "SELECT * FROM pitchers WHERE qs < 1 AND holds < 2 AND saves < 10", nativeQuery = true)
    List<Pitcher> findPitchersWithoutRole();
    @Query(value="SELECT * FROM pitchers WHERE game >= 10 ORDER BY wins DESC", nativeQuery = true)
    List<Pitcher> findTopOrderByWinDesc();
    Optional<Pitcher> findById(Long id);
    List<Pitcher> findTop5ByOrderByIdDesc();
}
