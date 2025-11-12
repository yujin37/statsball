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
        pitcherRepository.save(new Pitcher("박영현", "Wiz"));
        pitcherRepository.save(new Pitcher("김택연", "Bears"));
        pitcherRepository.save(new Pitcher("이로운", "Landers"));

    }
    @Test
    @DisplayName("투수 정보 모두 출력")
    public void testFindAllPitcher() {
        List<Pitcher> pitcherList = pitcherService.getAllPitchers();
        assertThat(pitcherList.size()).isEqualTo(3);
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
}
