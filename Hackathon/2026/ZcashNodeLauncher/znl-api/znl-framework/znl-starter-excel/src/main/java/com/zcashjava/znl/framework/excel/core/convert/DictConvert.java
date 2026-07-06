package com.zcashjava.znl.framework.excel.core.convert;

import com.zcashjava.znl.framework.dict.core.DictFrameworkUtils;
import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;

import cn.hutool.core.convert.Convert;
import cn.idev.excel.converters.Converter;
import cn.idev.excel.enums.CellDataTypeEnum;
import cn.idev.excel.metadata.GlobalConfiguration;
import cn.idev.excel.metadata.data.ReadCellData;
import cn.idev.excel.metadata.data.WriteCellData;
import cn.idev.excel.metadata.property.ExcelContentProperty;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class DictConvert implements Converter<Object> {

    @Override
    public Class<?> supportJavaTypeKey() {
        throw new UnsupportedOperationException("Not for now, not for now.");
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey() {
        throw new UnsupportedOperationException("Not for now, not for now.");
    }

    @Override
    public Object convertToJavaData(ReadCellData readCellData, ExcelContentProperty contentProperty,
                                    GlobalConfiguration globalConfiguration) {
        
        String type = getType(contentProperty);
        String label = readCellData.getStringValue();
        String value = DictFrameworkUtils.parseDictDataValue(type, label);
        if (value == null) {
            log.error("[convertto JavaData][type({}) cannot parsing label({}]", type, label);
            return null;
        }
        
        Class<?> fieldClazz = contentProperty.getField().getType();
        return Convert.convert(fieldClazz, value);
    }

    @Override
    public WriteCellData<String> convertToExcelData(Object object, ExcelContentProperty contentProperty,
                                                    GlobalConfiguration globalConfiguration) {
        
        if (object == null) {
            return new WriteCellData<>("");
        }

        
        String type = getType(contentProperty);
        String value = String.valueOf(object);
        String label = DictFrameworkUtils.parseDictDataLabel(type, value);
        if (label == null) {
            log.error("[convert To ExcelData] [type({}) cannot convert label({}]", type, value);
            return new WriteCellData<>("");
        }
        
        return new WriteCellData<>(label);
    }

    private static String getType(ExcelContentProperty contentProperty) {
        return contentProperty.getField().getAnnotation(DictFormat.class).value();
    }

}
