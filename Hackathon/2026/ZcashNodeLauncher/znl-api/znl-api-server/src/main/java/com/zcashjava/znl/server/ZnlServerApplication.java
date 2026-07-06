package com.zcashjava.znl.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;


@SpringBootApplication(scanBasePackages = {"${znl.info.base-package}.server", "${znl.info.base-package}.module"})
public class ZnlServerApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext ac = SpringApplication.run(ZnlServerApplication.class, args);
        
        
        
        ac.start();

    }

}
