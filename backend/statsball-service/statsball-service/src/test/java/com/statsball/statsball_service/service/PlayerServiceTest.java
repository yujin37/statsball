package com.statsball.statsball_service.service;

import static org.assertj.core.api.Assertions.assertThat;
import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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
        playerRepository.save(new Player("박해민", "Twins", "중견수"));
        playerRepository.save(new Player("노시환", "Eagles", "3루수"));
        playerRepository.save(new Player("송성문", "Heroes", "3루수"));
        playerRepository.save(new Player("문보경", "Twins", "1루수"));
        playerRepository.save(new Player("안현민", "Wiz", "좌익수"));
    }

    @Test
    @DisplayName("타자 정보를 모두 출력")
    public void testFindAllPlayer() {
        List<Player> playerList = playerService.getAllPlayers();
        assertThat(playerList.size()).isEqualTo(5);
        assertThat(playerList.get(0).getName()).isEqualTo("박해민");
    }

    @DisplayName("타자 정보 검색")
    @ParameterizedTest
    @CsvSource({ "position, 3루수", "name, 노시환", "teams, Eagles"})
    public void testSearchPlayer(String type, String keyword) {
        List<Player> playerList = playerService.getSearchPlayers(type, keyword);
        assertThat(playerList.getFirst().getName()).isEqualTo("노시환");

    }

    @DisplayName("타자 정보 검색 실패")
    @ParameterizedTest
    @CsvSource({ "position, ", "name, 박찬호", "teams, Lions", "position, 유격수"})
    public void testSearchPlayerFail(String type, String keyword) {
        List<Player> playerList = playerService.getSearchPlayers(type, keyword);
        assertThat(playerList).isEmpty();

    }

    @DisplayName("타자 포지션 별 검색")
    @ParameterizedTest
    @CsvSource({"내야수, 3", "외야수, 2", "포수, 0"})
    public void testSearchPosition(String groupPosition, int expectedCount) {
        List<Player> playerList = playerService.getPlayerPosition(groupPosition);
        assertThat(playerList.size()).isEqualTo(expectedCount);
    }

}
