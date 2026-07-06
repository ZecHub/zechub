package com.zcashjava.znl.module.zcash.enums;

import com.zcashjava.znl.framework.common.exception.ErrorCode;


public interface ErrorCodeConstants {

	ErrorCode INSTALLATION_SCRIPT_NOT_EXISTS = new ErrorCode(1_002_002_000, "Installation Script not exists");
	ErrorCode INSTALL_FAILED = new ErrorCode(1_002_002_100, "Install failed, see the status dialog to get more information. ");
	ErrorCode UNINSTALL_FAILED = new ErrorCode(1_002_002_101, "Uninstall failed");
	
	ErrorCode NODE_SERVER_NOT_EXISTS = new ErrorCode(1_002_003_000, "Node Server does not exist");
	ErrorCode NODE_SERVER_ALREADY_STARTED = new ErrorCode(1_002_003_100, "Node is already started");
	ErrorCode NODE_SERVER_NOT_RUNNING = new ErrorCode(1_002_003_101, "Node is not running");
	ErrorCode NODE_NOT_INSTALLED = new ErrorCode(1_002_003_102, "Node has not yet been installed");
	ErrorCode ALREADY_INSTALLED = new ErrorCode(1_002_003_102, "Node is already installed");


	
	
	
	
	
}
