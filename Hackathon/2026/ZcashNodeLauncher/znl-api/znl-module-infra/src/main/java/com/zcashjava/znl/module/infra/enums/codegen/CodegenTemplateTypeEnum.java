package com.zcashjava.znl.module.infra.enums.codegen;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;

import com.zcashjava.znl.framework.common.util.object.ObjectUtils;


@AllArgsConstructor
@Getter
public enum CodegenTemplateTypeEnum {

    ONE(1), 
    TREE(2), 

    MASTER_NORMAL(10), 
    MASTER_ERP(11), 
    MASTER_INNER(12), 
    SUB(15), 
    ;

    
    private final Integer type;

    
    public static boolean isMaster(Integer type) {
        return ObjectUtils.equalsAny(type,
                MASTER_NORMAL.type, MASTER_ERP.type, MASTER_INNER.type);
    }

    
    public static boolean isTree(Integer type) {
        return Objects.equals(type, TREE.type);
    }

}
