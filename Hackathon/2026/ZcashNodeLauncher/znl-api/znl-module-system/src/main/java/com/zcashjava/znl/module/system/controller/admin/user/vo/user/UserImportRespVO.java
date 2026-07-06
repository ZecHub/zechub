package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Schema(description = "Manage Backstage - User Import")
@Data
@Builder
public class UserImportRespVO {

    @Schema(description = "Create successful username array", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> createUsernames;

    @Schema(description = "Update successful username arrays", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> updateUsernames;

    @Schema(description = "Import failed user group, key for username, value for failure", requiredMode = Schema.RequiredMode.REQUIRED)
    private Map<String, String> failureUsernames;

}
