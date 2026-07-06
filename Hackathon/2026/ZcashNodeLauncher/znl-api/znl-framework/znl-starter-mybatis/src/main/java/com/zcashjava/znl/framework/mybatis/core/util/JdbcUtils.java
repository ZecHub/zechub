package com.zcashjava.znl.framework.mybatis.core.util;

import com.baomidou.dynamic.datasource.DynamicRoutingDataSource;
import com.baomidou.mybatisplus.annotation.DbType;
import com.zcashjava.znl.framework.common.util.object.ObjectUtils;
import com.zcashjava.znl.framework.common.util.spring.SpringUtils;
import com.zcashjava.znl.framework.mybatis.core.enums.DbTypeEnum;

import org.springframework.beans.factory.NoSuchBeanDefinitionException;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class JdbcUtils {

    
    public static boolean isConnectionOK(String url, String username, String password) {
        try (Connection ignored = DriverManager.getConnection(url, username, password)) {
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    
    public static DbType getDbType(String url) {
        return com.baomidou.mybatisplus.extension.toolkit.JdbcUtils.getDbType(url);
    }

    
    public static DbType getDbType() {
        DataSource dataSource;
        try {
            DynamicRoutingDataSource dynamicRoutingDataSource = SpringUtils.getBean(DynamicRoutingDataSource.class);
            dataSource = dynamicRoutingDataSource.determineDataSource();
        } catch (NoSuchBeanDefinitionException e) {
            dataSource = SpringUtils.getBean(DataSource.class);
        }
        try (Connection conn = dataSource.getConnection()) {
            return DbTypeEnum.find(conn.getMetaData().getDatabaseProductName());
        } catch (SQLException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    
    public static boolean isSQLServer(String url) {
        DbType dbType = getDbType(url);
        return isSQLServer(dbType);
    }

    
    public static boolean isSQLServer(DbType dbType) {
        return ObjectUtils.equalsAny(dbType, DbType.SQL_SERVER, DbType.SQL_SERVER2005);
    }

}
