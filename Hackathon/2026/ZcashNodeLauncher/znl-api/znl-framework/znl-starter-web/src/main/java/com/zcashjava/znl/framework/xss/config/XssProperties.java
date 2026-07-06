package com.zcashjava.znl.framework.xss.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.Collections;
import java.util.List;


@ConfigurationProperties(prefix = "znl.xss")
@Validated
@Data
public class XssProperties {

    
    private boolean enable = true;
    
    private List<String> excludeUrls = Collections.emptyList();

}
