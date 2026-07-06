package com.zcashjava.znl.framework.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum DocumentEnum {

    REDIS_INSTALL("#", "Redis Doc"),
    TENANT("#", "SaaS Doc");

    private final String url;
    private final String memo;

}
