package com.zcashjava.znl.framework.datapermission.core.rule;

import java.util.List;


public interface DataPermissionRuleFactory {

    
    List<DataPermissionRule> getDataPermissionRules();

    
    List<DataPermissionRule> getDataPermissionRule(String mappedStatementId);

}
