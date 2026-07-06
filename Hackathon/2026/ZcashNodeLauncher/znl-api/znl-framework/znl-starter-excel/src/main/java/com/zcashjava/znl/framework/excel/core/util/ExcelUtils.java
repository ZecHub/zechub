package com.zcashjava.znl.framework.excel.core.util;

import cn.idev.excel.FastExcelFactory;
import cn.idev.excel.converters.longconverter.LongStringConverter;

import org.springframework.web.multipart.MultipartFile;

import com.zcashjava.znl.framework.common.util.http.HttpUtils;
import com.zcashjava.znl.framework.excel.core.handler.ColumnWidthMatchStyleStrategy;
import com.zcashjava.znl.framework.excel.core.handler.SelectSheetWriteHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


public class ExcelUtils {

    
    public static <T> void write(HttpServletResponse response, String filename, String sheetName,
                                 Class<T> head, List<T> data) throws IOException {
        
        FastExcelFactory.write(response.getOutputStream(), head)
                .autoCloseStream(false) 
                .registerWriteHandler(new ColumnWidthMatchStyleStrategy()) 
                .registerWriteHandler(new SelectSheetWriteHandler(head)) 
                .registerConverter(new LongStringConverter()) 
                .sheet(sheetName).doWrite(data);
        
        response.addHeader("Content-Disposition", "attachment;filename=" + HttpUtils.encodeUtf8(filename));
        response.setContentType("application/vnd.ms-excel;charset=UTF-8");
    }

    public static <T> List<T> read(MultipartFile file, Class<T> head) throws IOException {
        return FastExcelFactory.read(file.getInputStream(), head, null)
                .autoCloseStream(false)  
                .doReadAllSync();
    }

}
