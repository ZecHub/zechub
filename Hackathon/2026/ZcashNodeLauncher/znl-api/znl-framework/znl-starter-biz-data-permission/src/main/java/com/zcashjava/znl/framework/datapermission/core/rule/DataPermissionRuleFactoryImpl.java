package com.zcashjava.znl.framework.datapermission.core.rule;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ArrayUtil;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;
import com.zcashjava.znl.framework.datapermission.core.aop.DataPermissionContextHolder;


@RequiredArgsConstructor
public class DataPermissionRuleFactoryImpl implements DataPermissionRuleFactory {

    
    private final List<DataPermissionRule> rules;

    @Override
    public List<DataPermissionRule> getDataPermissionRules() {
        return rules;
    }

    @Override 
    public List<DataPermissionRule> getDataPermissionRule(String mappedStatementId) {
        
        if (CollUtil.isEmpty(rules)) {
            return Collections.emptyList();
        }
        
        DataPermission dataPermission = DataPermissionContextHolder.get();
        if (dataPermission == null) {
            return rules;
        }
        
        if (!dataPermission.enable()) {
            return Collections.emptyList();
        }

        
        if (ArrayUtil.isNotEmpty(dataPermission.includeRules())) {
            return rules.stream().filter(rule -> ArrayUtil.contains(dataPermission.includeRules(), rule.getClass()))
                    .collect(Collectors.toList()); 
        }
        
        if (ArrayUtil.isNotEmpty(dataPermission.excludeRules())) {
            return rules.stream().filter(rule -> !ArrayUtil.contains(dataPermission.excludeRules(), rule.getClass()))
                    .collect(Collectors.toList()); 
        }
        
        return rules;
    }

}
