package com.zcashjava.znl.framework.common.util.number;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;

import java.math.BigDecimal;
import java.util.List;


public class NumberUtils {

    public static Long parseLong(String str) {
        return StrUtil.isNotEmpty(str) ? Long.valueOf(str) : null;
    }

    public static Integer parseInt(String str) {
        return StrUtil.isNotEmpty(str) ? Integer.valueOf(str) : null;
    }

    public static boolean isAllNumber(List<String> values) {
        if (CollUtil.isEmpty(values)) {
            return false;
        }
        for (String value : values) {
            if (!NumberUtil.isNumber(value)) {
                return false;
            }
        }
        return true;
    }

    
    public static double getDistance(double lat1, double lng1, double lat2, double lng2) {
        double radLat1 = lat1 * Math.PI / 180.0;
        double radLat2 = lat2 * Math.PI / 180.0;
        double a = radLat1 - radLat2;
        double b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        double distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
        distance = distance * 6378.137;
        distance = Math.round(distance * 10000d) / 10000d;
        return distance;
    }

    
    public static BigDecimal mul(BigDecimal... values) {
        for (BigDecimal value : values) {
            if (value == null) {
                return null;
            }
        }
        return NumberUtil.mul(values);
    }

}
