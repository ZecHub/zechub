package com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant;

import cn.hutool.core.util.ObjectUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "Manage Backstage - Tenant Create/Modify Request VO")
@Data
public class TenantSaveReqVO {

    @Schema(description = "Tenant Number", example = "1024")
    private Long id;

    @Schema(description = "Tenant name", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "The tenant's name can't be empty.")
    private String name;

    @Schema(description = "contactName", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "contactName")
    private String contactName;

    @Schema(description = "Contact the cell phone.", example = "15601691300")
    private String contactMobile;

    @Schema(description = "Tenant status", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "Tenant status")
    private Integer status;

    @Schema(description = "Bind domain names arrays")
    private List<String> websites;

    @Schema(description = "Tenant Suite Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "The tenant's suite cannot be empty.")
    private Long packageId;

    @Schema(description = "Expiration time", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Expiration time cannot be empty.")
    private LocalDateTime expireTime;

    @Schema(description = "Number of accounts", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "accountCount cannot be empty")
    private Integer accountCount;

    

    @Schema(description = "contactName", requiredMode = Schema.RequiredMode.REQUIRED)
    @Pattern(regexp = "^[a-zA-Z0-9]{4,30}$", message = "User account is composed of numbers, letters")
    @Size(min = 4, max = 30, message = "User account length of 4-30 characters")
    private String username;

    @Schema(description = "Password", requiredMode = Schema.RequiredMode.REQUIRED, example = "123456")
    @Length(min = 4, max = 16, message = "Password length 4-16 bits")
    private String password;

    @AssertTrue(message = "isUsernameValid")
    @JsonIgnore
    public boolean isUsernameValid() {
        return id != null 
                || (ObjectUtil.isAllNotEmpty(username, password)); 
    }

}
