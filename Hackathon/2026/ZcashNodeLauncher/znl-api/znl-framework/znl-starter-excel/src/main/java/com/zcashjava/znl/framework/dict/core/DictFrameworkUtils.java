package com.zcashjava.znl.framework.dict.core;

import cn.hutool.core.collection.CollUtil;

import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.zcashjava.znl.framework.common.biz.system.dict.DictDataCommonApi;
import com.zcashjava.znl.framework.common.biz.system.dict.dto.DictDataRespDTO;
import com.zcashjava.znl.framework.common.util.cache.CacheUtils;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;

import java.time.Duration;
import java.util.List;
import java.util.Objects;


@Slf4j
public class DictFrameworkUtils {

    private static DictDataCommonApi dictDataApi;

    
    private static final LoadingCache<String, List<DictDataRespDTO>> GET_DICT_DATA_CACHE = CacheUtils.buildAsyncReloadingCache(
            Duration.ofMinutes(1L), 
            new CacheLoader<String, List<DictDataRespDTO>>() {

                @Override
                public List<DictDataRespDTO> load(String dictType) {
                    return dictDataApi.getDictDataList(dictType);
                }

            });

    public static void init(DictDataCommonApi dictDataApi) {
        DictFrameworkUtils.dictDataApi = dictDataApi;
        log.info("[init] [Initiation of DietFrameworkUtils succeeded]");
    }

    public static void clearCache() {
        GET_DICT_DATA_CACHE.invalidateAll();
    }

    @SneakyThrows
    public static String parseDictDataLabel(String dictType, Integer value) {
        if (value == null) {
            return null;
        }
        return parseDictDataLabel(dictType, String.valueOf(value));
    }

    @SneakyThrows
    public static String parseDictDataLabel(String dictType, String value) {
        List<DictDataRespDTO> dictDatas = GET_DICT_DATA_CACHE.get(dictType);
        DictDataRespDTO dictData = CollUtil.findOne(dictDatas, data -> Objects.equals(data.getValue(), value));
        return dictData != null ? dictData.getLabel(): null;
    }

    @SneakyThrows
    public static List<String> getDictDataLabelList(String dictType) {
        List<DictDataRespDTO> dictDatas = GET_DICT_DATA_CACHE.get(dictType);
        return convertList(dictDatas, DictDataRespDTO::getLabel);
    }

    @SneakyThrows
    public static String parseDictDataValue(String dictType, String label) {
        List<DictDataRespDTO> dictDatas = GET_DICT_DATA_CACHE.get(dictType);
        DictDataRespDTO dictData = CollUtil.findOne(dictDatas, data -> Objects.equals(data.getLabel(), label));
        return dictData!= null ? dictData.getValue(): null;
    }

    @SneakyThrows
    public static List<String> getDictDataValueList(String dictType) {
        List<DictDataRespDTO> dictDatas = GET_DICT_DATA_CACHE.get(dictType);
        return convertList(dictDatas, DictDataRespDTO::getValue);
    }
}
