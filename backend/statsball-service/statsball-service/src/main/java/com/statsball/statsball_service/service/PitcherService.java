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
            case ("allPitcher") -> pitcherRepository.findAll();
            case("startingPitcher") -> pitcherRepository.findByQsIsGreaterThanEqual(1);
            case("bullpenPitcher") -> pitcherRepository.findByHoldsIsGreaterThanEqual(2);
            case("closingPitcher") -> pitcherRepository.findBySavesIsGreaterThanEqual(10);
            case("else") -> pitcherRepository.findPitchersWithoutRole();
            default -> new ArrayList<>();
        };
    }

    public List<Pitcher> getTopWinPitchers() {
        return pitcherRepository.findTopOrderByWinDesc()
                                .stream()
                                .limit(3)
                                .toList();
    }

    public List<Pitcher> getDetailPitcher(Long id) {
        return pitcherRepository.findById(id)
                .map(List::of)
                .orElseGet(List::of);
    }

}
