package com.statsball.statsball_service.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.statsball.statsball_service.service.PlayerService;
@SpringBootTest
@Transactional
public class PlayerServiceTest {

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    PlayerService playerService;

    @BeforeEach
    public void setUp() {
        playerRepository.deleteAll();
        playerRepository.save(new Player("박해민", "Twins"));
        playerRepository.save(new Player("노시환", "Eagles"));
    }

    @Test
    @DisplayName("타자 정보를 모두 출력")
    public void testFindAllPlayer() {
        List<Player> playerList = playerService.getAllPlayers();
        assertThat(playerList.size()).isEqualTo(2);
        assertThat(playerList.get(0).getName()).isEqualTo("박해민");
    }
}
