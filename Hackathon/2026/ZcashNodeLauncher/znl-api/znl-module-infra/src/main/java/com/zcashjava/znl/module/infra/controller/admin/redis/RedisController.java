package com.zcashjava.znl.module.infra.controller.admin.redis;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.redis.connection.RedisServerCommands;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.module.infra.controller.admin.redis.vo.RedisMonitorRespVO;
import com.zcashjava.znl.module.infra.convert.redis.RedisConvert;

import javax.annotation.Resource;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.Properties;

@Tag(name = "Manage Backstage - Redis Monitor")
@RestController
@RequestMapping("/infra/redis")
public class RedisController {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/get-monitor-info")
    @Operation(summary = "Obtain Redis surveillance information")
    @PreAuthorize("@ss.hasPermission('infra:redis:get-monitor-info')")
    public CommonResult<RedisMonitorRespVO> getRedisMonitorInfo() {
        
        Properties info = stringRedisTemplate.execute((RedisCallback<Properties>) RedisServerCommands::info);
        Long dbSize = stringRedisTemplate.execute(RedisServerCommands::dbSize);
        Properties commandStats = stringRedisTemplate.execute((
                RedisCallback<Properties>) connection -> connection.serverCommands().info("commandstats"));
        assert commandStats != null; 
        
        return success(RedisConvert.INSTANCE.build(info, dbSize, commandStats));
    }

}
