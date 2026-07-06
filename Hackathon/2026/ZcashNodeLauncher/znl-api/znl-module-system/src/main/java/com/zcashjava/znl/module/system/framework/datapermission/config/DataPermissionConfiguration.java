package com.zcashjava.znl.module.system.framework.datapermission.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zcashjava.znl.framework.datapermission.core.rule.dept.DeptDataPermissionRuleCustomizer;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;


@Configuration(proxyBeanMethods = false)
public class DataPermissionConfiguration {

    @Bean
    public DeptDataPermissionRuleCustomizer sysDeptDataPermissionRuleCustomizer() {
        return rule -> {
            
            rule.addDeptColumn(AdminUserDO.class);
            rule.addDeptColumn(DeptDO.class, "id");
            
            rule.addUserColumn(AdminUserDO.class, "id");
        };
    }

}
