package com.zcashjava.znl.framework.common.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

@Schema(description = "Sortable Page Break Parameters")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class SortablePageParam extends PageParam {

    @Schema(description = "Sort Fields")
    private List<SortingField> sortingFields;

}