package com.statsball.statsball_service.controller;

import com.statsball.statsball_service.domain.Pitcher;
import com.statsball.statsball_service.service.PitcherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name= "Pitcher")
@RestController
@RequestMapping("/api/pitcher")
public class PitcherController {
    private final PitcherService pitcherService;

    public PitcherController(PitcherService pitcherService) {
        this.pitcherService = pitcherService;
    }

    @GetMapping("/allPitchers")
    public List<Pitcher> allPitchers() { return pitcherService.getAllPitchers(); }

    @GetMapping("/searchPitchers")
    public List<Pitcher> searchPitchers(@RequestParam(value="type", required = false) String type,
                                        @RequestParam(value="keyword", required = false) String keyword) {
        System.out.println(type+ keyword);
        return pitcherService.getSearchPitchers(type, keyword);
    }

}
