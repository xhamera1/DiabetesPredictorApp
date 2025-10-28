package com.patrykchamera.diabetespredictor.dto.ai;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiPredictionRequest {

    @JsonProperty("hba1c_level")
    private BigDecimal hba1cLevel;

    @JsonProperty("blood_glucose_level")
    private Integer bloodGlucoseLevel;

    @JsonProperty("bmi")
    private BigDecimal bmi;

    @JsonProperty("age")
    private Double age;

    @JsonProperty("smoking_history")
    private Integer smokingHistory;
}
