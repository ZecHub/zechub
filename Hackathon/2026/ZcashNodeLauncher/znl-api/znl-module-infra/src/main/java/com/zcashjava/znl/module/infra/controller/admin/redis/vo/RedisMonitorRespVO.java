package com.zcashjava.znl.module.infra.controller.admin.redis.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Properties;

@Schema(description = "Manage Backstage - Redis Monitor Information Response VO")
@Data
@Builder
@AllArgsConstructor
public class RedisMonitorRespVO {

    @Schema(description = "Redisinfo command result, field-specific, view Redis document", requiredMode = Schema.RequiredMode.REQUIRED)
    private Properties info;

    @Schema(description = "Number of Redis keys", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long dbSize;

    @Schema(description = "Comand Stat Array", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CommandStat> commandStats;

    @Schema(description = "Redis Command Statistics")
    @Data
    @Builder
    @AllArgsConstructor
    public static class CommandStat {

        @Schema(description = "Redis command", requiredMode = Schema.RequiredMode.REQUIRED, example = "get")
        private String command;

        @Schema(description = "Number of calls", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
        private Long calls;

        @Schema(description = "CPU seconds consumed", requiredMode = Schema.RequiredMode.REQUIRED, example = "666")
        private Long usec;

    }

}
