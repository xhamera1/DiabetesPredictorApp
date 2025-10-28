package com.patrykchamera.diabetespredictor.controller;

import com.patrykchamera.diabetespredictor.dto.PredictionRequest;
import com.patrykchamera.diabetespredictor.dto.PredictionResponse;
import com.patrykchamera.diabetespredictor.model.User;
import com.patrykchamera.diabetespredictor.service.PredictionService;
import com.patrykchamera.diabetespredictor.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<PredictionResponse> createPrediction(@Valid @RequestBody PredictionRequest request) {
        User currentUser = userService.getCurrentUser();
        PredictionResponse response = predictionService.createPrediction(request, currentUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<PredictionResponse>> getPredictionHistory(Pageable pageable) {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(predictionService.getPredictionHistory(currentUser, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredictionResponse> getPredictionById(@PathVariable Long id) {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(predictionService.getPredictionById(id, currentUser));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePrediction(@PathVariable Long id) {
        User currentUser = userService.getCurrentUser();
        predictionService.deletePrediction(id, currentUser);
    }


}
