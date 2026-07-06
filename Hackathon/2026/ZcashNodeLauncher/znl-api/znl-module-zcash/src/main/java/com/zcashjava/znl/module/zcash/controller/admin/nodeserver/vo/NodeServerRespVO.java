package com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo;

import java.time.LocalDateTime;

import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "ZNL - Installation script Response VO")
@Data
@ExcelIgnoreUnannotated
public class NodeServerRespVO {

    @Schema(description = "ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("ID")
    private Long id;

    @Schema(description = "host", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("host")
    private String host;

    @Schema(description = "Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Name")
    private String name;


    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("username")
    private String username;

    @Schema(description = "password", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("password")
    private String password;

    @Schema(description = "default: 21", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("default: 21")
    private Integer port;

    @Schema(description = "Pruning Node/ Full Node")
    @ExcelProperty("Pruning Node/ Full Node")
    private String nodeType;

    @Schema(description = "proxy type")
    @ExcelProperty("proxy type")
    private String proxyType;

    @Schema(description = "proxy host")
    @ExcelProperty("proxy host")
    private String proxyHost;

    @Schema(description = "proxy port")
    @ExcelProperty("proxy port")
    private Integer proxyPort;

    @Schema(description = "proxy username")
    @ExcelProperty("proxy username")
    private String proxyUsername;

    @Schema(description = "proxy password")
    @ExcelProperty("proxy password")
    private String proxyPassword;

    @Schema(description = "online / lost")
    @ExcelProperty("online / lost")
    private String serverStatus;

    @Schema(description = "network not reachable / incorrect password / Exception")
    @ExcelProperty("network not reachable / incorrect password / Exception")
    private String serverError;

    @Schema(description = "server status check time")
    @ExcelProperty("server status check time")
    private LocalDateTime serverStatusCheckTime;

    @Schema(description = "not installed / installed")
    @ExcelProperty("not installed / installed")
    private String installationStatus;

    @Schema(description = "ssh output")
    @ExcelProperty("ssh output")
    private String installationLog;

    @Schema(description = "installation status check time")
    @ExcelProperty("installation status check time")
    private LocalDateTime installationStatusCheckTime;

    @Schema(description = "started / stopped")
    @ExcelProperty("started / stopped")
    private String nodeStatus;

    @Schema(description = "node start error")
    @ExcelProperty("node start error")
    private String nodeError;

    @Schema(description = "node status check time")
    @ExcelProperty("node status check time")
    private LocalDateTime nodeStatusCheckTime;

    @Schema(description = "Show Order")
    @ExcelProperty("Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    @ExcelProperty("Remarks")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Created")
    private LocalDateTime createTime;
    
    
    public void clearPrivateInfo() {
    	NodeServerRespVO data = this;
		data.setPassword(null);
		data.setProxyPassword(null);
		data.setHost(null);
	}
    
    
    
    
    


}