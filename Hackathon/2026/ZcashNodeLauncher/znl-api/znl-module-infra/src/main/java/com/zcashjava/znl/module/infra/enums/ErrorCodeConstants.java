package com.zcashjava.znl.module.infra.enums;

import com.zcashjava.znl.framework.common.exception.ErrorCode;


public interface ErrorCodeConstants {

    
    ErrorCode CONFIG_NOT_EXISTS = new ErrorCode(1_001_000_001, "Parameter Configuration does not exist");
    ErrorCode CONFIG_KEY_DUPLICATE = new ErrorCode(1_001_000_002, "Parameter Configuration Key Repeats");
    ErrorCode CONFIG_CAN_NOT_DELETE_SYSTEM_TYPE = new ErrorCode(1_001_000_003, "CONFIG_CAN_NOT_DELETE_SYSTEM_TYPE");
    ErrorCode CONFIG_GET_VALUE_ERROR_IF_VISIBLE = new ErrorCode(1_001_000_004, "Retrieving parameter configuration failed because: Unseen configuration is not allowed");

    
    ErrorCode JOB_NOT_EXISTS = new ErrorCode(1_001_001_000, "Time job does not exist");
    ErrorCode JOB_HANDLER_EXISTS = new ErrorCode(1_001_001_001, "Timed task processor already exists");
    ErrorCode JOB_CHANGE_STATUS_INVALID = new ErrorCode(1_001_001_002, "Allow changes to active or closed status only");
    ErrorCode JOB_CHANGE_STATUS_EQUALS = new ErrorCode(1_001_001_003, "Timed task is already in that state and no changes are required");
    ErrorCode JOB_UPDATE_ONLY_NORMAL_STATUS = new ErrorCode(1_001_001_004, "Only a status mission can be modified.");
    ErrorCode JOB_CRON_EXPRESSION_VALID = new ErrorCode(1_001_001_005, "CRON's expression is incorrect");
    ErrorCode JOB_HANDLER_BEAN_NOT_EXISTS = new ErrorCode(1_001_001_006, "Timed task processor Bean does not exist, note Bean default initial lowercase");
    ErrorCode JOB_HANDLER_BEAN_TYPE_ERROR = new ErrorCode(1_001_001_007, "The timed task processor Bean type is incorrect, JobHandler interface not achieved");

    
    ErrorCode API_ERROR_LOG_NOT_FOUND = new ErrorCode(1_001_002_000, "API error log does not exist");
    ErrorCode API_ERROR_LOG_PROCESSED = new ErrorCode(1_001_002_001, "API error log processed");

    
    ErrorCode FILE_PATH_EXISTS = new ErrorCode(1_001_003_000, "File path already exists");
    ErrorCode FILE_NOT_EXISTS = new ErrorCode(1_001_003_001, "File does not exist");
    ErrorCode FILE_IS_EMPTY = new ErrorCode(1_001_003_002, "File is empty");

    
    ErrorCode CODEGEN_TABLE_EXISTS = new ErrorCode(1_001_004_002, "Table definition already exists");
    ErrorCode CODEGEN_IMPORT_TABLE_NULL = new ErrorCode(1_001_004_001, "The imported table does not exist");
    ErrorCode CODEGEN_IMPORT_COLUMNS_NULL = new ErrorCode(1_001_004_002, "The imported field does not exist");
    ErrorCode CODEGEN_TABLE_NOT_EXISTS = new ErrorCode(1_001_004_004, "Table definition does not exist");
    ErrorCode CODEGEN_COLUMN_NOT_EXISTS = new ErrorCode(1_001_004_005, "Field meaning does not exist");
    ErrorCode CODEGEN_SYNC_COLUMNS_NULL = new ErrorCode(1_001_004_006, "Sync Fields do not exist");
    ErrorCode CODEGEN_SYNC_NONE_CHANGE = new ErrorCode(1_001_004_007, "Sync failed. No change.");
    ErrorCode CODEGEN_TABLE_INFO_TABLE_COMMENT_IS_NULL = new ErrorCode(1_001_004_008, "Table comment for database not completed");
    ErrorCode CODEGEN_TABLE_INFO_COLUMN_COMMENT_IS_NULL = new ErrorCode(1_001_004_009, "Table field comment ({}) for database not completed");
    ErrorCode CODEGEN_MASTER_TABLE_NOT_EXISTS = new ErrorCode(1_001_004_010, "The definition in the master table (id={}) does not exist, please check");
    ErrorCode CODEGEN_SUB_COLUMN_NOT_EXISTS = new ErrorCode(1_001_004_011, "The sub-table field (id={}) does not exist. Check");
    ErrorCode CODEGEN_MASTER_GENERATION_FAIL_NO_SUB_TABLE = new ErrorCode(1_001_004_012, "The main table generation code failed, because it didn't have a sub-watch.");

    
    ErrorCode FILE_CONFIG_NOT_EXISTS = new ErrorCode(1_001_006_000, "File Configuration does not exist");
    ErrorCode FILE_CONFIG_DELETE_FAIL_MASTER = new ErrorCode(1_001_006_001, "This file configuration is not allowed to be deleted because it is the main configuration and the deletion will result in the file not being uploaded");

    
    ErrorCode DATA_SOURCE_CONFIG_NOT_EXISTS = new ErrorCode(1_001_007_000, "Data Source Configuration does not exist");
    ErrorCode DATA_SOURCE_CONFIG_NOT_OK = new ErrorCode(1_001_007_001, "Data source configuration is incorrect and cannot be connected");

    
    ErrorCode DEMO01_CONTACT_NOT_EXISTS = new ErrorCode(1_001_201_000, "Example contact does not exist");
    ErrorCode DEMO02_CATEGORY_NOT_EXISTS = new ErrorCode(1_001_201_001, "Example classification does not exist");
    ErrorCode DEMO02_CATEGORY_EXITS_CHILDREN = new ErrorCode(1_001_201_002, "Existence sub-specify category, cannot be deleted");
    ErrorCode DEMO02_CATEGORY_PARENT_NOT_EXITS = new ErrorCode(1_001_201_003,"The parent example category does not exist");
    ErrorCode DEMO02_CATEGORY_PARENT_ERROR = new ErrorCode(1_001_201_004, "Can not create folder lock on %s: %s");
    ErrorCode DEMO02_CATEGORY_NAME_DUPLICATE = new ErrorCode(1_001_201_005, "An example class of the name already exists");
    ErrorCode DEMO02_CATEGORY_PARENT_IS_CHILD = new ErrorCode(1_001_201_006, "Can not create folder lock on %s: %s");
    ErrorCode DEMO03_STUDENT_NOT_EXISTS = new ErrorCode(1_001_201_007, "Students do not exist.");
    ErrorCode DEMO03_COURSE_NOT_EXISTS = new ErrorCode(1_001_201_008, "Student courses do not exist");
    ErrorCode DEMO03_GRADE_NOT_EXISTS = new ErrorCode(1_001_201_009, "Classes don't exist.");
    ErrorCode DEMO03_GRADE_EXISTS = new ErrorCode(1_001_201_010, "Student classes already exist.");

}
