package com.zcashjava.znl.framework.datapermission.core.db;

import cn.hutool.core.collection.CollUtil;

import com.baomidou.mybatisplus.extension.plugins.handler.MultiDataPermissionHandler;
import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRule;
import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRuleFactory;
import com.zcashjava.znl.framework.mybatis.core.util.MyBatisUtils;

import lombok.RequiredArgsConstructor;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.operators.conditional.AndExpression;
import net.sf.jsqlparser.schema.Table;

import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.skipPermissionCheck;

import java.util.List;


@RequiredArgsConstructor
public class DataPermissionRuleHandler implements MultiDataPermissionHandler {

    private final DataPermissionRuleFactory ruleFactory;

    @Override
    public Expression getSqlSegment(Table table, Expression where, String mappedStatementId) {
        
        if (skipPermissionCheck()) {
            return null;
        }

        
        List<DataPermissionRule> rules = ruleFactory.getDataPermissionRule(mappedStatementId);
        if (CollUtil.isEmpty(rules)) {
            return null;
        }

        
        Expression allExpression = null;
        for (DataPermissionRule rule : rules) {
            
            String tableName = MyBatisUtils.getTableName(table);
            if (!rule.getTableNames().contains(tableName)) {
                continue;
            }

            
            Expression oneExpress = rule.getExpression(tableName, table.getAlias());
            if (oneExpress == null) {
                continue;
            }
            
            allExpression = allExpression == null ? oneExpress
                    : new AndExpression(allExpression, oneExpress);
        }
        return allExpression;
    }

}
