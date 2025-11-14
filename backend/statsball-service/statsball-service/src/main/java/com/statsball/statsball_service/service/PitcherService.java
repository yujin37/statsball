package com.statsball.statsball_service.service;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.domain.Player;
import com.statsball.statsball_service.repository.PitcherRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PitcherService {

    private final PitcherRepository pitcherRepository;

    public PitcherService(PitcherRepository pitcherRepository) {
        this.pitcherRepository = pitcherRepository;
    }

    public List<Pitcher> getAllPitchers() {
        return pitcherRepository.findAll();
    }

    public List<Pitcher> getSearchPitchers(String type, String keyword) {
        if (type == null && keyword == null) {
            return pitcherRepository.findAll();
        }
        System.out.println(type + keyword);
        return findPitchersByTypeAndKeyword(type, keyword);
    }

    private List<Pitcher> findPitchersByTypeAndKeyword(String type, String keyword) {
        return switch (type) {
            case ("name") -> pitcherRepository.findByNameContaining(keyword);
            case ("teams") -> pitcherRepository.findByTeamsContaining(keyword);
            default -> new ArrayList<>();
        };
    }

    public List<Pitcher> getRolePitchers(String rule) {
        return switch (rule) {
            case ("전체") -> pitcherRepository.findAll();
            case("선발투수") -> pitcherRepository.findByQsIsGreaterThanEqual(1);
            case("불펜투수") -> pitcherRepository.findByHoldsIsGreaterThanEqual(2);
            case("마무리투수") -> pitcherRepository.findBySavesIsGreaterThanEqual(1);
            case("그외") -> pitcherRepository.findPitchersWithoutRole();
            default -> new ArrayList<>();
        };
    }

}
