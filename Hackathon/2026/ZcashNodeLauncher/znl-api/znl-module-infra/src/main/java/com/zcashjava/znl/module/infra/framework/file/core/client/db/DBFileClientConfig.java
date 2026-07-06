package com.zcashjava.znl.module.infra.framework.file.core.client.db;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;

import javax.validation.constraints.NotEmpty;


@Data
public class DBFileClientConfig implements FileClientConfig {

    
    @NotEmpty(message = "Domain can't be empty.")
    @URL(message = "Domain must be in URL format")
    private String domain;

}
