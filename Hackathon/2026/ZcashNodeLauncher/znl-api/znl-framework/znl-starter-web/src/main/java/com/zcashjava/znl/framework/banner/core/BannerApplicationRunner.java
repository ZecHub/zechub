package com.zcashjava.znl.framework.banner.core;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;

import cn.hutool.core.thread.ThreadUtil;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class BannerApplicationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        ThreadUtil.execute(() -> {
            ThreadUtil.sleep(1, TimeUnit.SECONDS); 
            log.info("\n----------------------------------------------------------\n" +
                            "Application started.\n" +
                            "----------------------------------------------------------\n"
                            + "https://github.com/zcashjava/ZcashNodeLauncher");
            
            
        });
    }


}
