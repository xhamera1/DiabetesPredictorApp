package com.patrykchamera.diabetespredictor.service;

import com.patrykchamera.diabetespredictor.dto.UserResponse;
import com.patrykchamera.diabetespredictor.dto.UserUpdateRequest;
import com.patrykchamera.diabetespredictor.exception.ResourceNotFoundException;
import com.patrykchamera.diabetespredictor.model.User;
import com.patrykchamera.diabetespredictor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + username));
    }

    public UserResponse getUserProfile() {
        User user = getCurrentUser();
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateUserProfile(UserUpdateRequest request) {
        User user = getCurrentUser();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDateOfBirth(request.getDateOfBirth());
        userRepository.save(user);
        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .dateOfBirth(user.getDateOfBirth())
                .role(user.getRole())
                .build();
    }
}
