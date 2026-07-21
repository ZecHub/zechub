package com.zcashjava.znl.framework.encrypt.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@ConfigurationProperties(prefix = "znl.api-encrypt")
@Validated
@Data
public class ApiEncryptProperties {

    
    @NotNull(message = "Whether or not to open cannot be empty")
    private Boolean enable;

    
    @NotEmpty(message = "Request header (response header) name cannot be empty")
    private String header = "X-Api-Encrypt";

    
    @NotEmpty(message = "Symmetric encryption algorithm cannot be empty")
    private String algorithm;

    
    @NotEmpty(message = "The requested decryption key cannot be empty")
    private String requestKey;

    
    @NotEmpty(message = "Replying encryption keys cannot be empty")
    private String responseKey;

}
