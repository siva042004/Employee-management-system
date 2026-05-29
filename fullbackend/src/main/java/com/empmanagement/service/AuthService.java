package com.empmanagement.service;

import com.empmanagement.entity.User;
import com.empmanagement.repository.UserRepository;
import com.empmanagement.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public Map<String, Object> login(String username, String password) {
        User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");
        String token = jwtUtil.generateToken(username, user.getRole().name());
        return Map.of("token", token, "user", Map.of(
            "id", user.getId(), "username", user.getUsername(), "role", user.getRole()
        ));
    }

    public Map<String, Object> register(String username, String password, String role) {
        if (userRepo.findByUsername(username).isPresent())
            throw new RuntimeException("Username already taken");
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role != null ? User.Role.valueOf(role) : User.Role.ROLE_VIEWER);
        userRepo.save(user);
        return Map.of("message", "User registered successfully");
    }
}
