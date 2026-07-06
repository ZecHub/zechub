package com.zcashjava.znl.framework.tenant.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;


@ConfigurationProperties(prefix = "znl.tenant")
@Data
public class TenantProperties {

    
    private static final Boolean ENABLE_DEFAULT = true;

    
    private Boolean enable = ENABLE_DEFAULT;

    
    private Set<String> ignoreUrls = new HashSet<>();

    
    private Set<String> ignoreVisitUrls = Collections.emptySet();

    
    private Set<String> ignoreTables = Collections.emptySet();

    
    private Set<String> ignoreCaches = Collections.emptySet();

}
