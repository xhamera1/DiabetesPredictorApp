package com.patrykchamera.diabetespredictor.dto;

import com.patrykchamera.diabetespredictor.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String accessToken; // token JWT, frontend bedzie musial dolaczac do kazdego kolejnego żądania
    private Long userId;
    private String email;
    private String firstName;
    private Role role;
}
