package com.statsball.statsball_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/api/home")
    public String sayHello() {
        return "Hello This is statsball!";
    }
}