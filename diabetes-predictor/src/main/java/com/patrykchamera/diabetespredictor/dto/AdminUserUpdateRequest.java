package com.patrykchamera.diabetespredictor.dto;

import com.patrykchamera.diabetespredictor.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserUpdateRequest {
    @Email(message = "Invalid email format")
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    @NotNull(message = "Role cannot be null")
    private Role role;
}
