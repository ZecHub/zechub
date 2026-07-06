package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

import cn.idev.excel.annotation.ExcelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserImportExcelVO {

    @ExcelProperty("Login Name")
    private String username;

    @ExcelProperty("User Name")
    private String nickname;

    @ExcelProperty("Sector Number")
    private Long deptId;

    @ExcelProperty("Cannot initialise Evolution's mail component.")
    private String email;

    @ExcelProperty("Cell phone number.")
    private String mobile;

    @ExcelProperty(value = "Sex of user", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.USER_SEX)
    private Integer sex;

    @ExcelProperty(value = "status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

}
