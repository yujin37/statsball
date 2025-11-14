package com.statsball.statsball_service.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="Home")
@RestController
public class HomeController {

    @GetMapping("/api/home")
    public String sayHello() {
        return "Hello This is statsball!";
    }
}