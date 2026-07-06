/** ==========COMMON - Generic Module========== */
const COMMON_DICT = {
  USER_TYPE: 'user_type',
  COMMON_STATUS: 'common_status',
  TERMINAL: 'terminal', // Terminal
  DATE_INTERVAL: 'date_interval', // Data Interval
} as const;

/** ==========SYSTEM - System Module========== */
const SYSTEM_DICT = {
  SYSTEM_USER_SEX: 'system_user_sex',
  SYSTEM_MENU_TYPE: 'system_menu_type',
  SYSTEM_ROLE_TYPE: 'system_role_type',
  SYSTEM_DATA_SCOPE: 'system_data_scope',
  SYSTEM_NOTICE_TYPE: 'system_notice_type',
  SYSTEM_LOGIN_TYPE: 'system_login_type',
  SYSTEM_LOGIN_RESULT: 'system_login_result',
  SYSTEM_SMS_CHANNEL_CODE: 'system_sms_channel_code',
  SYSTEM_SMS_TEMPLATE_TYPE: 'system_sms_template_type',
  SYSTEM_SMS_SEND_STATUS: 'system_sms_send_status',
  SYSTEM_SMS_RECEIVE_STATUS: 'system_sms_receive_status',
  SYSTEM_OAUTH2_GRANT_TYPE: 'system_oauth2_grant_type',
  SYSTEM_MAIL_SEND_STATUS: 'system_mail_send_status',
  SYSTEM_NOTIFY_TEMPLATE_TYPE: 'system_notify_template_type',
  SYSTEM_SOCIAL_TYPE: 'system_social_type',
} as const;

/** ==========INFRA - Infrastructure Module========== */
const INFRA_DICT = {
  INFRA_BOOLEAN_STRING: 'infra_boolean_string',
  INFRA_JOB_STATUS: 'infra_job_status',
  INFRA_JOB_LOG_STATUS: 'infra_job_log_status',
  INFRA_API_ERROR_LOG_PROCESS_STATUS: 'infra_api_error_log_process_status',
  INFRA_CONFIG_TYPE: 'infra_config_type',
  INFRA_CODEGEN_TEMPLATE_TYPE: 'infra_codegen_template_type',
  INFRA_CODEGEN_FRONT_TYPE: 'infra_codegen_front_type',
  INFRA_CODEGEN_SCENE: 'infra_codegen_scene',
  INFRA_FILE_STORAGE: 'infra_file_storage',
  INFRA_OPERATE_TYPE: 'infra_operate_type',
} as const;

/** ==========BPM - Workstream Module========== */
const BPM_DICT = {
  BPM_MODEL_FORM_TYPE: 'bpm_model_form_type', // BPM Model Form Type
  BPM_MODEL_TYPE: 'bpm_model_type', // BPM Model Type
  BPM_OA_LEAVE_TYPE: 'bpm_oa_leave_type', // BPM OA type of leave
  BPM_PROCESS_INSTANCE_STATUS: 'bpm_process_instance_status', // BPM Process Example State
  BPM_PROCESS_LISTENER_TYPE: 'bpm_process_listener_type', // BPM Process Monitor Type
  BPM_PROCESS_LISTENER_VALUE_TYPE: 'bpm_process_listener_value_type', // BPM Process Monitor Value Type
  BPM_TASK_CANDIDATE_STRATEGY: 'bpm_task_candidate_strategy', // BPM Mission Candidates Strategy
  BPM_TASK_STATUS: 'bpm_task_status', // BPM Task Status
} as const;

/** ==========PAY - Payment Module========== */
const PAY_DICT = {
  PAY_CHANNEL_CODE: 'pay_channel_code', // Type of payment channel encoding
  PAY_ORDER_STATUS: 'pay_order_status', // Status of purchase orders paid by businesses
  PAY_REFUND_STATUS: 'pay_refund_status', // Refund order status
  PAY_NOTIFY_STATUS: 'pay_notify_status', // Business payback status
  PAY_NOTIFY_TYPE: 'pay_notify_type', // Business payback status
  PAY_TRANSFER_STATUS: 'pay_transfer_status', // Transfer order status
  PAY_TRANSFER_TYPE: 'pay_transfer_type', // Transfer type
} as const;

/** ==========MP - Public Number Module========== */
const MP_DICT = {
  MP_AUTO_REPLY_REQUEST_MATCH: 'mp_auto_reply_request_match', // Auto-response request matching type
  MP_MESSAGE_TYPE: 'mp_message_type', // Message Type
} as const;

/** ==========MEMBER - Membership Module========== */
const MEMBER_DICT = {
  MEMBER_EXPERIENCE_BIZ_TYPE: 'member_experience_biz_type', // Type of business member's experience
  MEMBER_POINT_BIZ_TYPE: 'member_point_biz_type', // Business type with points
} as const;

/** ==========MALL - Business Town Module========== */
const MALL_DICT = {
  /** ==========MALL - Commodity Module========== */
  PRODUCT_SPU_STATUS: 'product_spu_status', // State of commodities

  /** ==========MALL - Transaction Module========== */
  EXPRESS_CHARGE_MODE: 'trade_delivery_express_charge_mode', // The way the delivery is billed.
  TRADE_AFTER_SALE_STATUS: 'trade_after_sale_status', // Post-sale - status
  TRADE_AFTER_SALE_TYPE: 'trade_after_sale_type', // After-sale - Type
  TRADE_AFTER_SALE_WAY: 'trade_after_sale_way', // After-sale - Mode
  TRADE_DELIVERY_TYPE: 'trade_delivery_type', // Distribution
  TRADE_ORDER_ITEM_AFTER_SALE_STATUS: 'trade_order_item_after_sale_status', // Order - Post-Sale Status
  TRADE_ORDER_STATUS: 'trade_order_status', // Order - Status
  TRADE_ORDER_TYPE: 'trade_order_type', // Order - Type
  BROKERAGE_BANK_NAME: 'brokerage_bank_name', // Commission Cash Bank
  BROKERAGE_BIND_MODE: 'brokerage_bind_mode', // Distribution relationship binding patterns
  BROKERAGE_ENABLED_CONDITION: 'brokerage_enabled_condition', // Commissary Mode
  BROKERAGE_RECORD_BIZ_TYPE: 'brokerage_record_biz_type', // Type of commission business
  BROKERAGE_RECORD_STATUS: 'brokerage_record_status', // Commission status
  BROKERAGE_WITHDRAW_STATUS: 'brokerage_withdraw_status', // Commission current status
  BROKERAGE_WITHDRAW_TYPE: 'brokerage_withdraw_type', // Type of commission

  /** ==========MALL - Marketing Module========== */

  PROMOTION_BANNER_POSITION: 'promotion_banner_position', // Banner Positioning
  PROMOTION_BARGAIN_RECORD_STATUS: 'promotion_bargain_record_status', // The status of the cut-off record.
  PROMOTION_COMBINATION_RECORD_STATUS: 'promotion_combination_record_status', // The status of the puzzle records.
  PROMOTION_CONDITION_TYPE: 'promotion_condition_type', //
  PROMOTION_COUPON_STATUS: 'promotion_coupon_status', // The state of the concession.
  PROMOTION_COUPON_TAKE_TYPE: 'promotion_coupon_take_type', // The way the concession is received.
  PROMOTION_COUPON_TEMPLATE_VALIDITY_TYPE:
    'promotion_coupon_template_validity_type', // Expiration Type of Preferential Template
  PROMOTION_DISCOUNT_TYPE: 'promotion_discount_type', // Type of preference
  PROMOTION_PRODUCT_SCOPE: 'promotion_product_scope', // Scope of goods to be marketed
} as const;

/** ==========CRM - Client Management Module========== */
const CRM_DICT = {
  CRM_AUDIT_STATUS: 'crm_audit_status', // CRM approval status
  CRM_BIZ_TYPE: 'crm_biz_type', // CRM Type of Operations
  CRM_BUSINESS_END_STATUS_TYPE: 'crm_business_end_status_type', // CRM Business End State Type
  CRM_CUSTOMER_INDUSTRY: 'crm_customer_industry', // CRM Client Industry
  CRM_CUSTOMER_LEVEL: 'crm_customer_level', // CRM Client Level
  CRM_CUSTOMER_SOURCE: 'crm_customer_source', // CRM Client Source
  CRM_FOLLOW_UP_TYPE: 'crm_follow_up_type', // CRM Follow-up Method
  CRM_PERMISSION_LEVEL: 'crm_permission_level', // Level of CRM data privileges
  CRM_PRODUCT_STATUS: 'crm_product_status', // CRM Commodity State
  CRM_PRODUCT_UNIT: 'crm_product_unit', // CRM Product Units
  CRM_RECEIVABLE_RETURN_TYPE: 'crm_receivable_return_type', // CRM Repayment Method of Repayment
} as const;

/** ==========ERP - Enterprise Resource Planning module========== */
const ERP_DICT = {
  ERP_AUDIT_STATUS: 'erp_audit_status', // ERP approval status
  ERP_STOCK_RECORD_BIZ_TYPE: 'erp_stock_record_biz_type', // Type of operations with detailed inventory
} as const;

/** ==========AI - Artificial Intelligence Module========== */
const AI_DICT = {
  AI_GENERATE_MODE: 'ai_generate_mode', // AI Generation Mode
  AI_IMAGE_STATUS: 'ai_image_status', // AI Image Status
  AI_MODEL_TYPE: 'ai_model_type', // AI Model Type
  AI_MUSIC_STATUS: 'ai_music_status', // AI Music State
  AI_PLATFORM: 'ai_platform', // AI Platform
  AI_WRITE_FORMAT: 'ai_write_format', // AI Writing Format
  AI_WRITE_LANGUAGE: 'ai_write_language', // AI Writing language
  AI_WRITE_LENGTH: 'ai_write_length', // AI Writing Length
  AI_WRITE_TONE: 'ai_write_tone', // AI writing tone
  AI_WRITE_TYPE: 'ai_write_type', // AI Writing Type
  AI_MCP_CLIENT_NAME: 'ai_mcp_client_name', // AI MCP Client Name
} as const;

/** ==========IOT - Material Networking Module========== */
const IOT_DICT = {
  IOT_ALERT_LEVEL: 'iot_alert_level', // IOT Warning Level
  IOT_ALERT_RECEIVE_TYPE: 'iot_alert_receive_type', // IOT Warning Receiving Type
  IOT_CODEC_TYPE: 'iot_codec_type', // IOT Data Format (Codator Type)
  IOT_DATA_FORMAT: 'iot_data_format', // IOT Data Format
  IOT_DATA_SINK_TYPE_ENUM: 'iot_data_sink_type_enum', // IOT Data Flow Purpose Type
  IOT_DATA_TYPE: 'iot_data_type', // IOT Data Type
  IOT_DEVICE_STATE: 'iot_device_state', // IOT Device Status
  IOT_DEVICE_STATUS: 'iot_device_status', // IOT Device Status
  IOT_LOCATION_TYPE: 'iot_location_type', // IOT Positioning Type
  IOT_NET_TYPE: 'iot_net_type', // IOT Networking Method
  IOT_OTA_TASK_DEVICE_SCOPE: 'iot_ota_task_device_scope', // Iot OTA task range
  IOT_OTA_TASK_RECORD_STATUS: 'iot_ota_task_record_status', // Iot OTA Record Status
  IOT_OTA_TASK_STATUS: 'iot_ota_task_status', // Iot OTA Task Status
  IOT_PRODUCT_DEVICE_TYPE: 'iot_product_device_type', // IOT Product Device Type
  IOT_PRODUCT_FUNCTION_TYPE: 'iot_product_function_type', // IOT Product Functional Type
  IOT_PRODUCT_STATUS: 'iot_product_status', // IOT Product Status
  IOT_PROTOCOL_TYPE: 'iot_protocol_type', // IOT Access Gateway Protocol
  IOT_RULE_SCENE_ACTION_TYPE_ENUM: 'iot_rule_scene_action_type_enum', // Trigger type for IOT rule scene
  IOT_RULE_SCENE_TRIGGER_TYPE_ENUM: 'iot_rule_scene_trigger_type_enum', // Trigger Type Trigger for IOT Script
  IOT_RW_TYPE: 'iot_rw_type', // IOT Type of Reading and Writing
  IOT_THING_MODEL_TYPE: 'iot_thing_model_type', // IOT Product Functional Type
  IOT_THING_MODEL_UNIT: 'iot_thing_model_unit', // IOT Model Units
  IOT_UNIT_TYPE: 'iot_unit_type', // IOT Unit Type
  IOT_VALIDATE_TYPE: 'iot_validate_type', // IOT Data Validation Level
} as const;

/** Dictionary Type Embracing - Unified Export */
const DICT_TYPE = {
  ...AI_DICT,
  ...BPM_DICT,
  ...CRM_DICT,
  ...ERP_DICT,
  ...INFRA_DICT,
  ...IOT_DICT,
  ...MEMBER_DICT,
  ...MP_DICT,
  ...PAY_DICT,
  ...MALL_DICT,
  ...SYSTEM_DICT,
  ...COMMON_DICT,
} as const;

export { DICT_TYPE };
