package com.zcashjava.znl.framework.datapermission.core.rule;

import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import net.sf.jsqlparser.expression.Alias;
import net.sf.jsqlparser.expression.Expression;

import java.util.Set;


public interface DataPermissionRule {

    
    Set<String> getTableNames();

    
    Expression getExpression(String tableName, Alias tableAlias);

}
