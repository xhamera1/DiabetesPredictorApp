package com.patrykchamera.diabetespredictor.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(nullable = false)
    private BigDecimal hba1cLevel;

    @Column(nullable = false)
    private Integer bloodGlucoseLevel;

    @Column(nullable = false)
    private BigDecimal bmi;

    @Column(nullable = false)
    private Double age;

    @Column(nullable = false)
    private Integer smokingHistory;



    @Column(nullable = false)
    private Integer prediction;

    @Column(nullable = false)
    private BigDecimal probability;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
