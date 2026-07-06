package com.zcashjava.znl.module.infra.framework.file.core.client.ftp;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
public class FtpFileClientConfig implements FileClientConfig {

    
    @NotEmpty(message = "The base path cannot be empty.")
    private String basePath;

    
    @NotEmpty(message = "Domain can't be empty.")
    @URL(message = "Domain must be in URL format")
    private String domain;

    
    @NotEmpty(message = "♪ Host can't be empty ♪")
    private String host;
    
    @NotNull(message = "Port cannot be empty")
    private Integer port;
    
    @NotEmpty(message = "username cannot be empty")
    private String username;
    
    @NotEmpty(message = "Password cannot be empty.")
    private String password;
    
    @NotEmpty(message = "Connection mode cannot be empty")
    private String mode;

}
