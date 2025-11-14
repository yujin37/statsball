package com.statsball.statsball_service.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PitcherRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional

public class PitcherServiceTest {

    @Autowired
    PitcherRepository pitcherRepository;

    @Autowired
    PitcherService pitcherService;

    @BeforeEach
    public void setUp() {
        pitcherRepository.deleteAll();
        pitcherRepository.save(new Pitcher("박영현", "Wiz", 0, 1, 35)); //마무리
        pitcherRepository.save(new Pitcher("김택연", "Bears", 0, 0, 24)); //마무리
        pitcherRepository.save(new Pitcher("곽빈", "Bears", 7, 0, 0)); //선발
        pitcherRepository.save(new Pitcher("임찬규", "Twins", 15, 0, 0)); //선발
        pitcherRepository.save(new Pitcher("이로운", "Landers", 0, 33, 1)); //불펜

    }
    @Test
    @DisplayName("투수 정보 모두 출력")
    public void testFindAllPitcher() {
        List<Pitcher> pitcherList = pitcherService.getAllPitchers();
        assertThat(pitcherList.size()).isEqualTo(5);
        assertThat(pitcherList.getFirst().getName()).isEqualTo("박영현");
        assertThat(pitcherList.getLast().getName()).isEqualTo("이로운");
    }

    @DisplayName("투수 정보 검색")
    @ParameterizedTest
    @CsvSource({"teams, Landers", "name, 이로운"})
    public void testSearchPitcher(String type, String keyword) {
        List<Pitcher> pitcherList = pitcherService.getSearchPitchers(type, keyword);
        assertThat(pitcherList.getFirst().getName()).isEqualTo("이로운");
        assertThat(pitcherList.getFirst().getTeams()).isEqualTo("Landers");
    }

    @DisplayName("투수 정보 검색 실패")
    @ParameterizedTest
    @CsvSource({"teams, Dinos", "name, 주승우", "teams, ", "name, s"})
    public void testSearchPitcherFail(String type, String keyword) {
        List<Pitcher> pitcherList = pitcherService.getSearchPitchers(type, keyword);
        assertThat(pitcherList).isEmpty();
    }

    @DisplayName("투수 역할별 검색")
    @ParameterizedTest
    @CsvSource({"선발투수, 2", "불펜투수, 1", "마무리투수, 2", "그외, 0", "전체, 5"})
    public void testRolePitcher(String role, int expetedCount) {
        List<Pitcher> pitcherList = pitcherService.getRolePitchers(role);
        assertThat(pitcherList.size()).isEqualTo(expetedCount);
    }
}
