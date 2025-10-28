package com.patrykchamera.diabetespredictor.service;

import com.patrykchamera.diabetespredictor.dto.AdminUserUpdateRequest;
import com.patrykchamera.diabetespredictor.dto.SignupRequest;
import com.patrykchamera.diabetespredictor.dto.UserResponse;
import com.patrykchamera.diabetespredictor.exception.ResourceNotFoundException;
import com.patrykchamera.diabetespredictor.exception.UserAlreadyExistsException;
import com.patrykchamera.diabetespredictor.model.Role;
import com.patrykchamera.diabetespredictor.model.User;
import com.patrykchamera.diabetespredictor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::mapToUserResponse);
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse createUser(SignupRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        });

        Role role = (request.getRole() != null) ? request.getRole() : Role.USER;

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    @Transactional
    public UserResponse updateUser(Long userId, AdminUserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setRole(request.getRole());

        User updatedUser = userRepository.save(user);
        return mapToUserResponse(updatedUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
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
