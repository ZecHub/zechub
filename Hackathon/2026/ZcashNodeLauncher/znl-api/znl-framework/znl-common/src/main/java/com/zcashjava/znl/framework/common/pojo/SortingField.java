package com.zcashjava.znl.framework.common.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SortingField implements Serializable {

    
    public static final String ORDER_ASC = "asc";
    
    public static final String ORDER_DESC = "desc";

    
    private String field;
    
    private String order;

}
