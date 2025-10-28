package com.patrykchamera.diabetespredictor.service;

import com.patrykchamera.diabetespredictor.client.AiClient;
import com.patrykchamera.diabetespredictor.dto.PredictionRequest;
import com.patrykchamera.diabetespredictor.dto.PredictionResponse;
import com.patrykchamera.diabetespredictor.dto.ai.AiPredictionRequest;
import com.patrykchamera.diabetespredictor.exception.ResourceNotFoundException;
import com.patrykchamera.diabetespredictor.model.Prediction;
import com.patrykchamera.diabetespredictor.model.User;
import com.patrykchamera.diabetespredictor.repository.PredictionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j //
@Service
@RequiredArgsConstructor
public class PredictionService {

    private final PredictionRepository predictionRepository;
    private final AiClient aiClient;

    @Transactional
    public PredictionResponse createPrediction(PredictionRequest request, User currentUser) {
        log.info("Starting prediction creation process for user: {}", currentUser.getEmail());
        try {
            log.info("Calculating BMI and preparing AI request...");
            var bmi = calculateBmi(request.getWeight(), request.getHeight());
            var aiRequest = AiPredictionRequest.builder()
                    .hba1cLevel(request.getHba1cLevel())
                    .bloodGlucoseLevel(request.getBloodGlucoseLevel())
                    .bmi(bmi)
                    .age((double) request.getAge())
                    .smokingHistory(request.getSmokingHistory())
                    .build();
            log.info("AI Request prepared: {}", aiRequest);


            log.info("Calling AI service...");
            var aiResponse = aiClient.getPrediction(aiRequest);
            log.info("Received response from AI service: {}", aiResponse);

            log.info("Saving prediction to the database...");
            var prediction = Prediction.builder()
                    .user(currentUser)
                    .hba1cLevel(request.getHba1cLevel())
                    .bloodGlucoseLevel(request.getBloodGlucoseLevel())
                    .bmi(bmi)
                    .age((double) request.getAge())
                    .smokingHistory(request.getSmokingHistory())
                    .prediction(aiResponse.getPrediction())
                    .probability(aiResponse.getProbability())
                    .build();
            Prediction savedPrediction = predictionRepository.save(prediction);
            log.info("Prediction saved with ID: {}", savedPrediction.getId());

            return PredictionResponse.builder()
                    .id(savedPrediction.getId())
                    .prediction(savedPrediction.getPrediction())
                    .probability(savedPrediction.getProbability())
                    .createdAt(savedPrediction.getCreatedAt())
                    .build();

        } catch (Exception e) {
            log.error("An error occurred during prediction creation for user: {}", currentUser.getEmail(), e);
            throw e;
        }
    }

    private BigDecimal calculateBmi(BigDecimal weight, BigDecimal height) {
        if (weight == null || height == null || height.compareTo(BigDecimal.ZERO) == 0) {
            log.warn("Weight or height is null or zero, returning BMI as 0.");
            return BigDecimal.ZERO;
        }
        var heightInMeters = height.divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        return weight.divide(heightInMeters.pow(2), 2, RoundingMode.HALF_UP);
    }

    public Page<PredictionResponse> getPredictionHistory(User currentUser, Pageable pageable) {
        return predictionRepository.findByUserOrderByCreatedAtDesc(currentUser, pageable)
                .map(this::mapToPredictionResponse);
    }

    public PredictionResponse getPredictionById(Long id, User currentUser) {
        Prediction prediction = predictionRepository.findById(id)
                .filter(p -> p.getUser().equals(currentUser))
                .orElseThrow(() -> new ResourceNotFoundException("Prediction not found with id: " + id));
        return mapToPredictionResponse(prediction);
    }

    @Transactional
    public void deletePrediction(Long id, User currentUser) {
        Prediction prediction = predictionRepository.findById(id)
                .filter(p -> p.getUser().equals(currentUser))
                .orElseThrow(() -> new ResourceNotFoundException("Prediction not found with id: " + id));
        predictionRepository.delete(prediction);
    }

    private PredictionResponse mapToPredictionResponse(Prediction prediction) {
        return PredictionResponse.builder()
                .id(prediction.getId())
                .prediction(prediction.getPrediction())
                .probability(prediction.getProbability())
                .createdAt(prediction.getCreatedAt())
                .build();
    }
}
