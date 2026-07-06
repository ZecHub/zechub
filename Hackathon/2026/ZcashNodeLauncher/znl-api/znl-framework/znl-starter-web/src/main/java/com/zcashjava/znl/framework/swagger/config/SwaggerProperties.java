package com.zcashjava.znl.framework.swagger.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotEmpty;


@ConfigurationProperties("znl.swagger")
@Data
public class SwaggerProperties {

    
    @NotEmpty(message = "Title cannot be empty")
    private String title;
    
    @NotEmpty(message = "Description cannot be empty.")
    private String description;
    
    @NotEmpty(message = "Author cannot be empty.")
    private String author;
    
    @NotEmpty(message = "Version cannot be empty")
    private String version;
    
    @NotEmpty(message = "Scanned package cannot be empty")
    private String url;
    
    @NotEmpty(message = "Scanned emails cannot be empty")
    private String email;

    
    @NotEmpty(message = "Scanned License cannot be empty")
    private String license;

    
    @NotEmpty(message = "Scanned License-url cannot be empty")
    private String licenseUrl;

}
