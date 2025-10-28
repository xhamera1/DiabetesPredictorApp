package com.patrykchamera.diabetespredictor.controller;

import com.patrykchamera.diabetespredictor.dto.LoginRequest;
import com.patrykchamera.diabetespredictor.dto.LoginResponse;
import com.patrykchamera.diabetespredictor.dto.SignupRequest;
import com.patrykchamera.diabetespredictor.dto.UserResponse;
import com.patrykchamera.diabetespredictor.service.AuthenticationService;
import com.patrykchamera.diabetespredictor.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController { // publiczne endpointy  /auth/signup i /auth/login

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@Valid @RequestBody SignupRequest request) {
        authenticationService.signup(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/me") // to jest wsm alias do pobierania profilu uzytkownika
    public ResponseEntity<UserResponse> getCurrentUser() {
        return ResponseEntity.ok(userService.getUserProfile());
    }
}
