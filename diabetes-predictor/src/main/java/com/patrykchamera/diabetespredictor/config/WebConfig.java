package com.patrykchamera.diabetespredictor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer { // globalna konfiugurcja CORS, ustawiamy ktore aplikacje moga komunikowac sie z api nasszym

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // wszytskie endpointy
                .allowedOrigins("http://localhost:5173") // frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
