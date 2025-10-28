package com.patrykchamera.diabetespredictor.service;

import com.patrykchamera.diabetespredictor.dto.LoginRequest;
import com.patrykchamera.diabetespredictor.dto.LoginResponse;
import com.patrykchamera.diabetespredictor.dto.SignupRequest;
import com.patrykchamera.diabetespredictor.exception.InvalidCredentialsException;
import com.patrykchamera.diabetespredictor.exception.UserAlreadyExistsException;
import com.patrykchamera.diabetespredictor.model.Role;
import com.patrykchamera.diabetespredictor.model.User;
import com.patrykchamera.diabetespredictor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists.");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password."));

        var jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder()
                .accessToken(jwtToken)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .role(user.getRole())
                .build();
    }
}
