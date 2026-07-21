package com.zcashjava.znl.framework.security.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

@ConfigurationProperties(prefix = "znl.security")
@Validated
@Data
public class SecurityProperties {

    
    @NotEmpty(message = "Token Header can't be empty.")
    private String tokenHeader = "Authorization";
    
    @NotEmpty(message = "Token Parameter can't be empty.")
    private String tokenParameter = "token";

    
    @NotNull(message = "Lock mode switches cannot be empty")
    private Boolean mockEnable = false;
    
    @NotEmpty(message = "The key for mock mode cannot be empty") 
    private String mockSecret = "test";

    
    private List<String> permitAllUrls = Collections.emptyList();

    
    private Integer passwordEncoderLength = 4;
}
