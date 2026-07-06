package com.zcashjava.znl.framework.datapermission.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;

import com.zcashjava.znl.framework.common.biz.system.permission.PermissionCommonApi;
import com.zcashjava.znl.framework.datapermission.core.rule.dept.DeptDataPermissionRule;
import com.zcashjava.znl.framework.datapermission.core.rule.dept.DeptDataPermissionRuleCustomizer;
import com.zcashjava.znl.framework.security.core.LoginUser;

import java.util.List;


@AutoConfiguration
@ConditionalOnClass(LoginUser.class)
@ConditionalOnBean(value = {DeptDataPermissionRuleCustomizer.class})
public class ZnlDeptDataPermissionAutoConfiguration {

    @Bean
    public DeptDataPermissionRule deptDataPermissionRule(PermissionCommonApi permissionApi,
                                                         List<DeptDataPermissionRuleCustomizer> customizers) {
        
        DeptDataPermissionRule rule = new DeptDataPermissionRule(permissionApi);
        
        customizers.forEach(customizer -> customizer.customize(rule));
        return rule;
    }

}
