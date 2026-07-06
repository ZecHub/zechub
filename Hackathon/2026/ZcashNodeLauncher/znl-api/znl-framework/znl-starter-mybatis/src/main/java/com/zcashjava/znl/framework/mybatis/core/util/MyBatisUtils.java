package com.zcashjava.znl.framework.mybatis.core.util;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.func.Func1;
import cn.hutool.core.lang.func.LambdaUtil;
import cn.hutool.core.util.StrUtil;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.InnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.SortingField;
import com.zcashjava.znl.framework.mybatis.core.enums.DbTypeEnum;

import net.sf.jsqlparser.expression.Alias;
import net.sf.jsqlparser.schema.Column;
import net.sf.jsqlparser.schema.Table;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class MyBatisUtils {

    private static final String MYSQL_ESCAPE_CHARACTER = "`";

    public static <T> Page<T> buildPage(PageParam pageParam) {
        return buildPage(pageParam, null);
    }

    public static <T> Page<T> buildPage(PageParam pageParam, Collection<SortingField> sortingFields) {
        
        Page<T> page = new Page<>(pageParam.getPageNo(), pageParam.getPageSize());
        
        if (CollUtil.isNotEmpty(sortingFields)) {
            for (SortingField sortingField : sortingFields) {
                page.addOrder(new OrderItem().setAsc(SortingField.ORDER_ASC.equals(sortingField.getOrder()))
                        .setColumn(StrUtil.toUnderlineCase(sortingField.getField())));
            }
        }
        return page;
    }

    @SuppressWarnings("PatternVariableCanBeUsed")
    public static <T> void addOrder(Wrapper<T> wrapper, Collection<SortingField> sortingFields) {
        if (CollUtil.isEmpty(sortingFields)) {
            return;
        }
        if (wrapper instanceof QueryWrapper) {
            QueryWrapper<T> query = (QueryWrapper<T>) wrapper;
            for (SortingField sortingField : sortingFields) {
                query.orderBy(true,
                        SortingField.ORDER_ASC.equals(sortingField.getOrder()),
                        StrUtil.toUnderlineCase(sortingField.getField()));
            }
        } else if (wrapper instanceof LambdaQueryWrapper) {
            
            LambdaQueryWrapper<T> lambdaQuery = (LambdaQueryWrapper<T>) wrapper;
            StringBuilder orderBy = new StringBuilder();
            for (SortingField sortingField : sortingFields) {
                if (StrUtil.isNotEmpty(orderBy)) {
                    orderBy.append(", ");
                }
                orderBy.append(StrUtil.toUnderlineCase(sortingField.getField()))
                       .append(" ")
                       .append(SortingField.ORDER_ASC.equals(sortingField.getOrder()) ? "ASC" : "DESC");
            }
            lambdaQuery.last("ORDER BY " + orderBy);
            
        } else {
            throw new IllegalArgumentException("Unsupported wrapper type: " + wrapper.getClass().getName());
        }

    }

    
    public static void addInterceptor(MybatisPlusInterceptor interceptor, InnerInterceptor inner, int index) {
        List<InnerInterceptor> inners = new ArrayList<>(interceptor.getInterceptors());
        inners.add(index, inner);
        interceptor.setInterceptors(inners);
    }

    
    public static String getTableName(Table table) {
        String tableName = table.getName();
        if (tableName.startsWith(MYSQL_ESCAPE_CHARACTER) && tableName.endsWith(MYSQL_ESCAPE_CHARACTER)) {
            tableName = tableName.substring(1, tableName.length() - 1);
        }
        return tableName;
    }

    
    public static Column buildColumn(String tableName, Alias tableAlias, String column) {
        if (tableAlias != null) {
            tableName = tableAlias.getName();
        }
        return new Column(tableName + StringPool.DOT + column);
    }

    
    public static String findInSet(String column, Object value) {
        DbType dbType = JdbcUtils.getDbType();
        return DbTypeEnum.getFindInSetTemplate(dbType)
                .replace("#{column}", column)
                .replace("#{value}", StrUtil.toString(value));
    }

    
    public static <T> String toUnderlineCase(Func1<T, ?> func) {
        String fieldName = LambdaUtil.getFieldName(func);
        return StrUtil.toUnderlineCase(fieldName);
    }

}
