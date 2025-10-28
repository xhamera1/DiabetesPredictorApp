package com.patrykchamera.diabetespredictor.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiPredictionResponse {
    private Integer prediction;
    private BigDecimal probability;
}
