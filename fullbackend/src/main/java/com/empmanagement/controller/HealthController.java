package com.empmanagement.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("app", "Employee Management API", "status", "running");
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy");
    }
}
