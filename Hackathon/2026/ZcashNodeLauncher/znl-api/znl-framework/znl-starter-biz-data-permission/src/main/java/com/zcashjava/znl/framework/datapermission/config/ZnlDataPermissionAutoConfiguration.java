package com.zcashjava.znl.framework.datapermission.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DataPermissionInterceptor;
import com.zcashjava.znl.framework.datapermission.core.aop.DataPermissionAnnotationAdvisor;
import com.zcashjava.znl.framework.datapermission.core.db.DataPermissionRuleHandler;
import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRule;
import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRuleFactory;
import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRuleFactoryImpl;
import com.zcashjava.znl.framework.mybatis.core.util.MyBatisUtils;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.List;


@AutoConfiguration
public class ZnlDataPermissionAutoConfiguration {

    @Bean
    public DataPermissionRuleFactory dataPermissionRuleFactory(List<DataPermissionRule> rules) {
        return new DataPermissionRuleFactoryImpl(rules);
    }

    @Bean
    public DataPermissionRuleHandler dataPermissionRuleHandler(MybatisPlusInterceptor interceptor,
                                                               DataPermissionRuleFactory ruleFactory) {
        
        DataPermissionRuleHandler handler = new DataPermissionRuleHandler(ruleFactory);
        DataPermissionInterceptor inner = new DataPermissionInterceptor(handler);
        
        
        MyBatisUtils.addInterceptor(interceptor, inner, 0);
        return handler;
    }

    @Bean
    public DataPermissionAnnotationAdvisor dataPermissionAnnotationAdvisor() {
        return new DataPermissionAnnotationAdvisor();
    }

}
