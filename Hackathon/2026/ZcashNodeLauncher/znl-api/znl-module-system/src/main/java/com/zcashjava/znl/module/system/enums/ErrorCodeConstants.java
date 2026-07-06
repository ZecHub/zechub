package com.zcashjava.znl.module.system.enums;

import com.zcashjava.znl.framework.common.exception.ErrorCode;


public interface ErrorCodeConstants {

    
    ErrorCode AUTH_LOGIN_BAD_CREDENTIALS = new ErrorCode(1_002_000_000, "Login failed. Account password incorrect.");
    ErrorCode AUTH_LOGIN_USER_DISABLED = new ErrorCode(1_002_000_001, "Login failed, account disabled");
    ErrorCode AUTH_LOGIN_CAPTCHA_CODE_ERROR = new ErrorCode(1_002_000_004, "AUTH_LOGIN_CAPTCHA_CODE_ERROR");
    ErrorCode AUTH_THIRD_LOGIN_NOT_BIND = new ErrorCode(1_002_000_005, "Unbound account numbers need to be tied");
    ErrorCode AUTH_MOBILE_NOT_EXISTS = new ErrorCode(1_002_000_007, "The cell number doesn't exist.");
    ErrorCode AUTH_REGISTER_CAPTCHA_CODE_ERROR = new ErrorCode(1_002_000_008, "AUTH_REGISTER_CAPTCHA_CODE_ERROR");

    
    ErrorCode MENU_NAME_DUPLICATE = new ErrorCode(1_002_001_000, "A menu already exists for the name");
    ErrorCode MENU_PARENT_NOT_EXISTS = new ErrorCode(1_002_001_001, "The parent menu does not exist");
    ErrorCode MENU_PARENT_ERROR = new ErrorCode(1_002_001_002, "Can not create folder lock on %s: %s");
    ErrorCode MENU_NOT_EXISTS = new ErrorCode(1_002_001_003, "Menu does not exist");
    ErrorCode MENU_EXISTS_CHILDREN = new ErrorCode(1_002_001_004, "Exists submenu, cannot be deleted");
    ErrorCode MENU_PARENT_NOT_DIR_OR_MENU = new ErrorCode(1_002_001_005, "The parent menu type must be a directory or menu");
    ErrorCode MENU_COMPONENT_NAME_DUPLICATE = new ErrorCode(1_002_001_006, "Menu for this component name already exists");

    
    ErrorCode ROLE_NOT_EXISTS = new ErrorCode(1_002_002_000, "Role does not exist");
    ErrorCode ROLE_NAME_DUPLICATE = new ErrorCode(1_002_002_001, "ROLE_NAME_DUPLICATE");
    ErrorCode ROLE_CODE_DUPLICATE = new ErrorCode(1_002_002_002, "ROLE_CODE_DUPLICATE");
    ErrorCode ROLE_CAN_NOT_UPDATE_SYSTEM_TYPE_ROLE = new ErrorCode(1_002_002_003, "ROLE_CAN_NOT_UPDATE_SYSTEM_TYPE_ROLE");
    ErrorCode ROLE_IS_DISABLE = new ErrorCode(1_002_002_004, "The character with the name [ ] has been disabled.");
    ErrorCode ROLE_ADMIN_CODE_ERROR = new ErrorCode(1_002_002_005, "ROLE_ADMIN_CODE_ERROR");

    
    ErrorCode USER_USERNAME_EXISTS = new ErrorCode(1_002_003_000, "USER_USERNAME_EXISTS");
    ErrorCode USER_MOBILE_EXISTS = new ErrorCode(1_002_003_001, "Cell phone numbers already exist.");
    ErrorCode USER_EMAIL_EXISTS = new ErrorCode(1_002_003_002, "Mailbox already exists.");
    ErrorCode USER_NOT_EXISTS = new ErrorCode(1_002_003_003, "User does not exist");
    ErrorCode USER_IMPORT_LIST_IS_EMPTY = new ErrorCode(1_002_003_004, "USER_IMPORT_LIST_IS_EMPTY");
    ErrorCode USER_PASSWORD_FAILED = new ErrorCode(1_002_003_005, "USER_PASSWORD_FAILED");
    ErrorCode USER_IS_DISABLE = new ErrorCode(1_002_003_006, "The user with the name [{} has been disabled");
    ErrorCode USER_COUNT_MAX = new ErrorCode(1_002_003_008, "USER_COUNT_MAX");
    ErrorCode USER_IMPORT_INIT_PASSWORD = new ErrorCode(1_002_003_009, "Initial password cannot be empty");
    ErrorCode USER_MOBILE_NOT_EXISTS = new ErrorCode(1_002_003_010, "It's not registered yet.");
    ErrorCode USER_REGISTER_DISABLED = new ErrorCode(1_002_003_011, "The registration function is closed.");

    
    ErrorCode DEPT_NAME_DUPLICATE = new ErrorCode(1_002_004_000, "There's already a division in the name.");
    ErrorCode DEPT_PARENT_NOT_EXITS = new ErrorCode(1_002_004_001,"The parent department doesn't exist.");
    ErrorCode DEPT_NOT_FOUND = new ErrorCode(1_002_004_002, "Current sector does not exist");
    ErrorCode DEPT_EXITS_CHILDREN = new ErrorCode(1_002_004_003, "Existing subsector cannot be deleted");
    ErrorCode DEPT_PARENT_ERROR = new ErrorCode(1_002_004_004, "You can't set yourself up as a parent department.");
    ErrorCode DEPT_NOT_ENABLE = new ErrorCode(1_002_004_006, "Department ({}) is not open and selection is not allowed");
    ErrorCode DEPT_PARENT_IS_CHILD = new ErrorCode(1_002_004_007, "You can't set your own subsector as a parent department.");

    
    ErrorCode POST_NOT_FOUND = new ErrorCode(1_002_005_000, "Current position does not exist");
    ErrorCode POST_NOT_ENABLE = new ErrorCode(1_002_005_001, "Job ({}) is not open, no selection is allowed");
    ErrorCode POST_NAME_DUPLICATE = new ErrorCode(1_002_005_002, "There's already a job in that name.");
    ErrorCode POST_CODE_DUPLICATE = new ErrorCode(1_002_005_003, "The mark already exists.");

    
    ErrorCode DICT_TYPE_NOT_EXISTS = new ErrorCode(1_002_006_001, "The current dictionary type does not exist");
    ErrorCode DICT_TYPE_NOT_ENABLE = new ErrorCode(1_002_006_002, "Dictionary type is not open. Selection is not allowed");
    ErrorCode DICT_TYPE_NAME_DUPLICATE = new ErrorCode(1_002_006_003, "A dictionary type already exists for the name");
    ErrorCode DICT_TYPE_TYPE_DUPLICATE = new ErrorCode(1_002_006_004, "A dictionary type of this type already exists");
    ErrorCode DICT_TYPE_HAS_CHILDREN = new ErrorCode(1_002_006_005, "Unable to delete, the dictionary type and dictionary data");

    
    ErrorCode DICT_DATA_NOT_EXISTS = new ErrorCode(1_002_007_001, "Current dictionary data does not exist");
    ErrorCode DICT_DATA_NOT_ENABLE = new ErrorCode(1_002_007_002, "Dictionary data ({}) is not open. Selection is not allowed");
    ErrorCode DICT_DATA_VALUE_DUPLICATE = new ErrorCode(1_002_007_003, "Dictionary data already exists for this value");

    
    ErrorCode NOTICE_NOT_FOUND = new ErrorCode(1_002_008_001, "The current notice bulletin does not exist");

    
    ErrorCode SMS_CHANNEL_NOT_EXISTS = new ErrorCode(1_002_011_000, "SMS channels don't exist.");
    ErrorCode SMS_CHANNEL_DISABLE = new ErrorCode(1_002_011_001, "SMS channels are not open. No choice allowed.");
    ErrorCode SMS_CHANNEL_HAS_CHILDREN = new ErrorCode(1_002_011_002, "Could not be deleted. The SMS channel and the SMS template.");

    
    ErrorCode SMS_TEMPLATE_NOT_EXISTS = new ErrorCode(1_002_012_000, "SMS template does not exist");
    ErrorCode SMS_TEMPLATE_CODE_DUPLICATE = new ErrorCode(1_002_012_001, "A text message template has been encoded as [{}");
    ErrorCode SMS_TEMPLATE_API_ERROR = new ErrorCode(1_002_012_002, "SMS API template call failed because: {}");
    ErrorCode SMS_TEMPLATE_API_AUDIT_CHECKING = new ErrorCode(1_002_012_003, "Text message API template not available, cause: approval in progress");
    ErrorCode SMS_TEMPLATE_API_AUDIT_FAIL = new ErrorCode(1_002_012_004, "Text message API template not available for reasons: approval denied, {}");
    ErrorCode SMS_TEMPLATE_API_NOT_FOUND = new ErrorCode(1_002_012_005, "Text message API template could not be used because the template does not exist");

    
    ErrorCode SMS_SEND_MOBILE_NOT_EXISTS = new ErrorCode(1_002_013_000, "The cell number doesn't exist.");
    ErrorCode SMS_SEND_MOBILE_TEMPLATE_PARAM_MISS = new ErrorCode(1_002_013_001, "Template parameters ({}) are missing");
    ErrorCode SMS_SEND_TEMPLATE_NOT_EXISTS = new ErrorCode(1_002_013_002, "SMS template does not exist");

    
    ErrorCode SMS_CODE_NOT_FOUND = new ErrorCode(1_002_014_000, "SMS_CODE_NOT_FOUND");
    ErrorCode SMS_CODE_EXPIRED = new ErrorCode(1_002_014_001, "SMS_CODE_EXPIRED");
    ErrorCode SMS_CODE_USED = new ErrorCode(1_002_014_002, "SMS_CODE_USED");
    ErrorCode SMS_CODE_EXCEED_SEND_MAXIMUM_QUANTITY_PER_DAY = new ErrorCode(1_002_014_004, "More than daily text messages sent");
    ErrorCode SMS_CODE_SEND_TOO_FAST = new ErrorCode(1_002_014_005, "Text messages were sent too often.");

    
    ErrorCode TENANT_NOT_EXISTS = new ErrorCode(1_002_015_000, "Tenant does not exist.");
    ErrorCode TENANT_DISABLE = new ErrorCode(1_002_015_001, "The tenant whose name is [ ] has been disabled.");
    ErrorCode TENANT_EXPIRE = new ErrorCode(1_002_015_002, "The tenant whose name is [ ] has expired.");
    ErrorCode TENANT_CAN_NOT_UPDATE_SYSTEM = new ErrorCode(1_002_015_003, "System tenants cannot modify, delete, etc.");
    ErrorCode TENANT_NAME_DUPLICATE = new ErrorCode(1_002_015_004, "The tenant with the name [ ] already exists.");
    ErrorCode TENANT_WEBSITE_DUPLICATE = new ErrorCode(1_002_015_005, "The tenant whose domain is {} already exists.");

    
    ErrorCode TENANT_PACKAGE_NOT_EXISTS = new ErrorCode(1_002_016_000, "The tenant's suite doesn't exist.");
    ErrorCode TENANT_PACKAGE_USED = new ErrorCode(1_002_016_001, "The tenant is using the package. Please reset the package for the tenant and try to delete it.");
    ErrorCode TENANT_PACKAGE_DISABLE = new ErrorCode(1_002_016_002, "The tenant package named [ ] has been disabled.");
    ErrorCode TENANT_PACKAGE_NAME_DUPLICATE = new ErrorCode(1_002_016_003, "A tenant's suite already exists by that name.");

    
    ErrorCode SOCIAL_USER_AUTH_FAILURE = new ErrorCode(1_002_018_000, "Social authorization failed because: {}");
    ErrorCode SOCIAL_USER_NOT_FOUND = new ErrorCode(1_002_018_001, "SOCIAL_USER_NOT_FOUND");

    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_PHONE_CODE_ERROR = new ErrorCode(1_002_018_200, "SOCIAL_CLIENT_WEIXIN_MINI_APP_PHONE_CODE_ERROR");
    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_QRCODE_ERROR = new ErrorCode(1_002_018_201, "SOCIAL_CLIENT_WEIXIN_MINI_APP_QRCODE_ERROR");
    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_SUBSCRIBE_TEMPLATE_ERROR = new ErrorCode(1_002_018_202, "SOCIAL_CLIENT_WEIXIN_MINI_APP_SUBSCRIBE_TEMPLATE_ERROR");
    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_SUBSCRIBE_MESSAGE_ERROR = new ErrorCode(1_002_018_203, "SOCIAL_CLIENT_WEIXIN_MINI_APP_SUBSCRIBE_MESSAGE_ERROR");
    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_ORDER_UPLOAD_SHIPPING_INFO_ERROR = new ErrorCode(1_002_018_204, "Failed to upload micro-mail dispatch information");
    ErrorCode SOCIAL_CLIENT_WEIXIN_MINI_APP_ORDER_NOTIFY_CONFIRM_RECEIVE_ERROR = new ErrorCode(1_002_018_205, "Failed to upload micro-letter order receipt information");
    ErrorCode SOCIAL_CLIENT_NOT_EXISTS = new ErrorCode(1_002_018_210, "Social client does not exist");
    ErrorCode SOCIAL_CLIENT_UNIQUE = new ErrorCode(1_002_018_211, "Social client already exists configuration");

    
    ErrorCode OAUTH2_CLIENT_NOT_EXISTS = new ErrorCode(1_002_020_000, "OAuth2 Client does not exist");
    ErrorCode OAUTH2_CLIENT_EXISTS = new ErrorCode(1_002_020_001, "OAuth2 client number already exists");
    ErrorCode OAUTH2_CLIENT_DISABLE = new ErrorCode(1_002_020_002, "OAuth2 client disabled");
    ErrorCode OAUTH2_CLIENT_AUTHORIZED_GRANT_TYPE_NOT_EXISTS = new ErrorCode(1_002_020_003, "The type of authorization is not supported");
    ErrorCode OAUTH2_CLIENT_SCOPE_OVER = new ErrorCode(1_002_020_004, "It's too broad a mandate.");
    ErrorCode OAUTH2_CLIENT_REDIRECT_URI_NOT_MATCH = new ErrorCode(1_002_020_005, "Invalid redact_uri: {}");
    ErrorCode OAUTH2_CLIENT_CLIENT_SECRET_ERROR = new ErrorCode(1_002_020_006, "Invalid client_second: {}");

    
    ErrorCode OAUTH2_GRANT_CLIENT_ID_MISMATCH = new ErrorCode(1_002_021_000, "Client_id does not match");
    ErrorCode OAUTH2_GRANT_REDIRECT_URI_MISMATCH = new ErrorCode(1_002_021_001, "Redirect_uri does not match");
    ErrorCode OAUTH2_GRANT_STATE_MISMATCH = new ErrorCode(1_002_021_002, "State does not match");

    
    ErrorCode OAUTH2_CODE_NOT_EXISTS = new ErrorCode(1_002_022_000, "Code does not exist");
    ErrorCode OAUTH2_CODE_EXPIRE = new ErrorCode(1_002_022_001, "code expired");

    
    ErrorCode MAIL_ACCOUNT_NOT_EXISTS = new ErrorCode(1_002_023_000, "MAIL_ACCOUNT_NOT_EXISTS");
    ErrorCode MAIL_ACCOUNT_RELATE_TEMPLATE_EXISTS = new ErrorCode(1_002_023_001, "MAIL_ACCOUNT_RELATE_TEMPLATE_EXISTS");

    
    ErrorCode MAIL_TEMPLATE_NOT_EXISTS = new ErrorCode(1_002_024_000, "MAIL_TEMPLATE_NOT_EXISTS");
    ErrorCode MAIL_TEMPLATE_CODE_EXISTS = new ErrorCode(1_002_024_001, "Mail template ({}) already exists");

    
    ErrorCode MAIL_SEND_TEMPLATE_PARAM_MISS = new ErrorCode(1_002_025_000, "Template parameters ({}) are missing");
    ErrorCode MAIL_SEND_MAIL_NOT_EXISTS = new ErrorCode(1_002_025_001, "Mailbox does not exist");

    
    ErrorCode NOTIFY_TEMPLATE_NOT_EXISTS = new ErrorCode(1_002_026_000, "Cannot initialise Evolution's mail component.");
    ErrorCode NOTIFY_TEMPLATE_CODE_DUPLICATE = new ErrorCode(1_002_026_001, "Cannot initialise Evolution's mail component.");

    

    
    ErrorCode NOTIFY_SEND_TEMPLATE_PARAM_MISS = new ErrorCode(1_002_028_000, "Template parameters ({}) are missing");

}
