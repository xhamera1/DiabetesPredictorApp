package com.patrykchamera.diabetespredictor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionResponse {

    private Long id;
    private Integer prediction;
    private BigDecimal probability;
    private LocalDateTime createdAt;
}
