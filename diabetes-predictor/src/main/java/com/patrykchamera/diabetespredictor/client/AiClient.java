package com.patrykchamera.diabetespredictor.client;

import com.patrykchamera.diabetespredictor.dto.ai.AiPredictionRequest;
import com.patrykchamera.diabetespredictor.dto.ai.AiPredictionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class AiClient {

    private final RestTemplate restTemplate; // upraszcza komunikacje HTTP

    @Value("${ai.base-url}")
    private String aiApiBaseUrl;

    // calle do api servicu predykcyjnego w pythonie Fastapi
    public AiPredictionResponse getPrediction(AiPredictionRequest request) {
        String url = aiApiBaseUrl + "/v1/predict";
        return restTemplate.postForObject(url, request, AiPredictionResponse.class);
    }
}
