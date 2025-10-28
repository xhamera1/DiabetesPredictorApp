package com.patrykchamera.diabetespredictor.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionRequest {


    @NotNull(message = "HbA1c level is required")
    private BigDecimal hba1cLevel;

    @NotNull(message = "Blood glucose level is required")
    private Integer bloodGlucoseLevel;

    @NotNull(message = "Smoking history is required")
    private Integer smokingHistory;


    private BigDecimal weight;
    private BigDecimal height;
    private Integer age;

    private String bloodPressure;
    private String activityLevel;
}
