package com.patrykchamera.diabetespredictor.controller;

import com.patrykchamera.diabetespredictor.dto.UserResponse;
import com.patrykchamera.diabetespredictor.dto.UserUpdateRequest;
import com.patrykchamera.diabetespredictor.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUserProfile(@Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUserProfile(request));
    }
}
