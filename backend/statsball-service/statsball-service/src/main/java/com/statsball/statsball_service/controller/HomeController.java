package com.statsball.statsball_service.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(originPatterns = "http://168.107.37.97:80/")
@Tag(name="Home")
@RestController
public class HomeController {

    @GetMapping("/api/home")
    public String sayHello() {
        return "Hello This is statsball!";
    }
}