package com.zcashjava.znl.framework.web.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@ConfigurationProperties(prefix = "znl.web")
@Validated
@Data
public class WebProperties {

    @NotNull(message = "APP API cannot be empty")
    private Api appApi = new Api("/app-api", "**.controller.app.**");
    @NotNull(message = "Admin API cannot be empty")
    private Api adminApi = new Api("/admin-api", "**.controller.admin.**");

    @NotNull(message = "Admin UI cannot be empty")
    private Ui adminUi;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Valid
    public static class Api {

        
        @NotEmpty(message = "API prefix cannot be empty")
        private String prefix;

        
        @NotEmpty(message = "Controller's bag can't be empty.")
        private String controller;

    }

    @Data
    @Valid
    public static class Ui {

        
        private String url;

    }

}
