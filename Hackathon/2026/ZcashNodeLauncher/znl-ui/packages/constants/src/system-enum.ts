/**
 * Created by potato source* * Enumeration class
 */

/**
 * Embrace of AI Platform
 */
export const AiPlatformEnum = {
  TONG_YI: 'TongYi', // Ali.
  YI_YAN: 'YiYan', // 100 degrees
  DEEP_SEEK: 'DeepSeek', // DeepSeek
  ZHI_PU: 'ZhiPu', // Ideas. AI.
  XING_HUO: 'XingHuo', // Xiao Fei!
  SiliconFlow: 'SiliconFlow', // Silicon-based flow
  OPENAI: 'OpenAI',
  Ollama: 'Ollama',
  STABLE_DIFFUSION: 'StableDiffusion', // Stability AI
  MIDJOURNEY: 'Midjourney', // Midjourney
  SUNO: 'Suno', // Suno AI
};

export const AiModelTypeEnum = {
  CHAT: 1, // Chat
  IMAGE: 2, // Image
  VOICE: 3, // Audio
  VIDEO: 4, // Video
  EMBEDDING: 5, // Vector
  RERANK: 6, // Rehearsal
};
export interface ImageModel {
  image?: string;
  key: string;
  name: string;
}
export const OtherPlatformEnum: ImageModel[] = [
  {
    key: AiPlatformEnum.TONG_YI,
    name: "It's perfect.",
  },
  {
    key: AiPlatformEnum.YI_YAN,
    name: 'A hundred thousand sails.',
  },
  {
    key: AiPlatformEnum.ZHI_PU,
    name: 'Ideas. AI.',
  },
  {
    key: AiPlatformEnum.SiliconFlow,
    name: 'Silicon-based flow',
  },
];
/**
 * Embrace of AI image generation status
 */
export const AiImageStatusEnum = {
  IN_PROGRESS: 10, // Ongoing
  SUCCESS: 20, // Completed
  FAIL: 30, // Failed
};
/**
 * Embrace of the AI Music Generation State
 */
export const AiMusicStatusEnum = {
  IN_PROGRESS: 10, // Ongoing
  SUCCESS: 20, // Completed
  FAIL: 30, // Failed
};

/**
 * AI Embrace of Writing Type
 */
export enum AiWriteTypeEnum {
  WRITING = 1, // Writing
  REPLY, // Response
}

// ========== Embraces associated with [picture UI]==========

export const ImageHotWords = [
  'The flag robe.',
  "It's a beauty in a costume.",
  "Cartoon's head.",
  'Armored soldiers.',
  'The fairytale house.',
  'Great Wall of China',
]; // Picture hotwords

export const ImageHotEnglishWords = [
  'Chinese Cheongsam',
  'Ancient Beauty',
  'Cartoon Avatar',
  'Mech Warrior',
  'Fairy Tale Cottage',
  'The Great Wall of China',
]; // Photo hotwords (English)

export const StableDiffusionSamplers: ImageModel[] = [
  {
    key: 'DDIM',
    name: 'DDIM',
  },
  {
    key: 'DDPM',
    name: 'DDPM',
  },
  {
    key: 'K_DPMPP_2M',
    name: 'K_DPMPP_2M',
  },
  {
    key: 'K_DPMPP_2S_ANCESTRAL',
    name: 'K_DPMPP_2S_ANCESTRAL',
  },
  {
    key: 'K_DPM_2',
    name: 'K_DPM_2',
  },
  {
    key: 'K_DPM_2_ANCESTRAL',
    name: 'K_DPM_2_ANCESTRAL',
  },
  {
    key: 'K_EULER',
    name: 'K_EULER',
  },
  {
    key: 'K_EULER_ANCESTRAL',
    name: 'K_EULER_ANCESTRAL',
  },
  {
    key: 'K_HEUN',
    name: 'K_HEUN',
  },
  {
    key: 'K_LMS',
    name: 'K_LMS',
  },
];

export const StableDiffusionStylePresets: ImageModel[] = [
  {
    key: '3d-model',
    name: '3d-model',
  },
  {
    key: 'analog-film',
    name: 'analog-film',
  },
  {
    key: 'anime',
    name: 'anime',
  },
  {
    key: 'cinematic',
    name: 'cinematic',
  },
  {
    key: 'comic-book',
    name: 'comic-book',
  },
  {
    key: 'digital-art',
    name: 'digital-art',
  },
  {
    key: 'enhance',
    name: 'enhance',
  },
  {
    key: 'fantasy-art',
    name: 'fantasy-art',
  },
  {
    key: 'isometric',
    name: 'isometric',
  },
  {
    key: 'line-art',
    name: 'line-art',
  },
  {
    key: 'low-poly',
    name: 'low-poly',
  },
  {
    key: 'modeling-compound',
    name: 'modeling-compound',
  },
  // neon-punk origami photographic pixel-art tile-texture
  {
    key: 'neon-punk',
    name: 'neon-punk',
  },
  {
    key: 'origami',
    name: 'origami',
  },
  {
    key: 'photographic',
    name: 'photographic',
  },
  {
    key: 'pixel-art',
    name: 'pixel-art',
  },
  {
    key: 'tile-texture',
    name: 'tile-texture',
  },
];

export const StableDiffusionClipGuidancePresets: ImageModel[] = [
  {
    key: 'NONE',
    name: 'NONE',
  },
  {
    key: 'FAST_BLUE',
    name: 'FAST_BLUE',
  },
  {
    key: 'FAST_GREEN',
    name: 'FAST_GREEN',
  },
  {
    key: 'SIMPLE',
    name: 'SIMPLE',
  },
  {
    key: 'SLOW',
    name: 'SLOW',
  },
  {
    key: 'SLOWER',
    name: 'SLOWER',
  },
  {
    key: 'SLOWEST',
    name: 'SLOWEST',
  },
];
// ========== COMMON Module==========
// Global Universal Status Enumeration
export const CommonStatusEnum = {
  ENABLE: 0, // Open
  DISABLE: 1, // Disable
};

// Global User Type Enumeration
export const UserTypeEnum = {
  MEMBER: 1, // Members
  ADMIN: 2, // Administrator
};

// ========== SYSTEM Module==========
/**
 * Menu Type Enumeration
 */
export const SystemMenuTypeEnum = {
  DIR: 1, // Contents
  MENU: 2, // Menu
  BUTTON: 3, // Button
};

/**
 */
export const SystemRoleTypeEnum = {
  SYSTEM: 1, // A built-in role
  CUSTOM: 2, // Custom Roles
};

/**
 * Scope of Data Permissions
 */
export const SystemDataScopeEnum = {
  ALL: 1, // All Data Permissions
  DEPT_CUSTOM: 2, // Specify sector data privileges
  DEPT_ONLY: 3, // Sectoral Data Permissions
  DEPT_AND_CHILD: 4, // Department and access to the following data
  DEPT_SELF: 5, // Personal Data Permission only
};

/**
 * Type of social platform for users
 */
export const SystemUserSocialTypeEnum = {
  TEST: {
    title: 'TEST',
    type: 20,
    source: 'TEST',
    img: '/static/imgs/zcash.png',
  },
};

// ========== INFRA Module==========
/**
 * Code Generation Template Type
 */
export const InfraCodegenTemplateTypeEnum = {
  CRUD: 1, // Base CRUD
  TREE: 2, // Tree
  SUB: 15, // Master watch CRUD
};

/**
 * Embrace of Task State
 */
export const InfraJobStatusEnum = {
  INIT: 0, // Initializing
  NORMAL: 1, // Running
  STOP: 2, // Pause
};

/**
 * API Anomalous Data Processing Status
 */
export const InfraApiErrorLogProcessStatusEnum = {
  INIT: 0, // Not processed
  DONE: 1, // Processed
  IGNORE: 2, // Ignored
};
export interface ImageSize {
  height: string;
  key: string;
  name?: string;
  style: string;
  width: string;
}
export const Dall3SizeList: ImageSize[] = [
  {
    key: '1024x1024',
    name: '1:1',
    width: '1024',
    height: '1024',
    style: 'width: 30px; height: 30px;background-color: #dcdcdc;',
  },
  {
    key: '1024x1792',
    name: '3:5',
    width: '1024',
    height: '1792',
    style: 'width: 30px; height: 50px;background-color: #dcdcdc;',
  },
  {
    key: '1792x1024',
    name: '5:3',
    width: '1792',
    height: '1024',
    style: 'width: 50px; height: 30px;background-color: #dcdcdc;',
  },
];

export const Dall3Models: ImageModel[] = [
  {
    key: 'dall-e-3',
    name: 'DALL·E 3',
    image: `/static/imgs/ai/dall2.jpg`,
  },
  {
    key: 'dall-e-2',
    name: 'DALL·E 2',
    image: `/static/imgs/ai/dall3.jpg`,
  },
];

export const Dall3StyleList: ImageModel[] = [
  {
    key: 'vivid',
    name: 'Clear',
    image: `/static/imgs/ai/qingxi.jpg`,
  },
  {
    key: 'natural',
    name: 'Naturally.',
    image: `/static/imgs/ai/ziran.jpg`,
  },
];
export const MidjourneyModels: ImageModel[] = [
  {
    key: 'midjourney',
    name: 'MJ',
    image: 'https://bigpt8.com/pc/_nuxt/mj.34a61377.png',
  },
  {
    key: 'niji',
    name: 'NIJI',
    image: 'https://bigpt8.com/pc/_nuxt/nj.ca79b143.png',
  },
];
export const MidjourneyVersions = [
  {
    value: '6.0',
    label: 'v6.0',
  },
  {
    value: '5.2',
    label: 'v5.2',
  },
  {
    value: '5.1',
    label: 'v5.1',
  },
  {
    value: '5.0',
    label: 'v5.0',
  },
  {
    value: '4.0',
    label: 'v4.0',
  },
];

export const NijiVersionList = [
  {
    value: '5',
    label: 'v5',
  },
];

export const MidjourneySizeList: ImageSize[] = [
  {
    key: '1:1',
    width: '1',
    height: '1',
    style: 'width: 30px; height: 30px;background-color: #dcdcdc;',
  },
  {
    key: '3:4',
    width: '3',
    height: '4',
    style: 'width: 30px; height: 40px;background-color: #dcdcdc;',
  },
  {
    key: '4:3',
    width: '4',
    height: '3',
    style: 'width: 40px; height: 30px;background-color: #dcdcdc;',
  },
  {
    key: '9:16',
    width: '9',
    height: '16',
    style: 'width: 30px; height: 50px;background-color: #dcdcdc;',
  },
  {
    key: '16:9',
    width: '16',
    height: '9',
    style: 'width: 50px; height: 30px;background-color: #dcdcdc;',
  },
];
// ========== PAY Module==========
/**
 * List of payment channels
 */
export const PayChannelEnum = {
  WX_PUB: {
    code: 'wx_pub',
    name: 'Can not open message',
  },
  WX_LITE: {
    code: 'wx_lite',
    name: 'Micromail Applet Payment',
  },
  WX_APP: {
    code: 'wx_app',
    name: 'Micromail APP Payment',
  },
  WX_NATIVE: {
    code: 'wx_native',
    name: 'Can not open message',
  },
  WX_WAP: {
    code: 'wx_wap',
    name: 'Micromail WAP website payment',
  },
  WX_BAR: {
    code: 'wx_bar',
    name: 'Micromail bar code payment',
  },
  ALIPAY_PC: {
    code: 'alipay_pc',
    name: 'Payment for the PC website',
  },
  ALIPAY_WAP: {
    code: 'alipay_wap',
    name: 'Payment for the WAP website',
  },
  ALIPAY_APP: {
    code: 'alipay_app',
    name: 'Pay the APP payment',
  },
  ALIPAY_QR: {
    code: 'alipay_qr',
    name: 'Pay for the broom code.',
  },
  ALIPAY_BAR: {
    code: 'alipay_bar',
    name: 'Pay for the bar code.',
  },
  WALLET: {
    code: 'wallet',
    name: 'Wallet payments',
  },
  MOCK: {
    code: 'mock',
    name: 'Simulation payments',
  },
};

/**
 * Pay-for-show mode per game
 */
export const PayDisplayModeEnum = {
  URL: {
    mode: 'url',
  },
  IFRAME: {
    mode: 'iframe',
  },
  FORM: {
    mode: 'form',
  },
  QR_CODE: {
    mode: 'qr_code',
  },
  APP: {
    mode: 'app',
  },
};

/**
 * Payment Type Embracing
 */
export const PayType = {
  WECHAT: 'WECHAT',
  ALIPAY: 'ALIPAY',
  MOCK: 'MOCK',
};

/**
 * Payment order status list
 */
export const PayOrderStatusEnum = {
  WAITING: {
    status: 0,
    name: 'Unpaid',
  },
  SUCCESS: {
    status: 10,
    name: 'Paid',
  },
  CLOSED: {
    status: 20,
    name: 'Unpaid',
  },
};

// ========== MALL - Commodity Module==========
/**
 * Commodity Home Page Date Type
 */
export enum TimeRangeTypeEnum {
  DAY30 = 1,
  MONTH = 30,
  WEEK = 7,
  YEAR = 365,
}

/**
 * Commodity SPU status
 */
export const ProductSpuStatusEnum = {
  RECYCLE: {
    status: -1,
    name: 'Wastebin',
  },
  DISABLE: {
    status: 0,
    name: 'Get off!',
  },
  ENABLE: {
    status: 1,
    name: 'Get on board.',
  },
};

// ========== MALL - Marketing Module==========
/**
 * Excerpts of limited-duration type for preferential template
 */
export const CouponTemplateValidityTypeEnum = {
  DATE: {
    type: 1,
    name: 'Fixed date available',
  },
  TERM: {
    type: 2,
    name: 'Available upon receipt',
  },
};

/**
 * Enumeration of how the preferential template is to be received
 */
export const CouponTemplateTakeTypeEnum = {
  USER: {
    type: 1,
    name: 'Direct receipt',
  },
  ADMIN: {
    type: 2,
    name: 'Specified release',
  },
  REGISTER: {
    type: 3,
    name: 'New coupons.',
  },
};

/**
 * Examples of the range of goods to be marketed
 */
export const PromotionProductScopeEnum = {
  ALL: {
    scope: 1,
    name: 'General',
  },
  SPU: {
    scope: 2,
    name: 'Commodities',
  },
  CATEGORY: {
    scope: 3,
    name: 'Physician Physics',
  },
};

/**
 */
export const PromotionConditionTypeEnum = {
  PRICE: {
    type: 10,
    name: 'Full N',
  },
  COUNT: {
    type: 20,
    name: 'Full N',
  },
};

/**
 * Favourable Type Enumeration
 */
export const PromotionDiscountTypeEnum = {
  PRICE: {
    type: 1,
    name: 'Full or partial.',
  },
  PERCENT: {
    type: 2,
    name: 'Discount',
  },
};

// ========== MALL - Transaction Module==========
/**
 * Distribution relationship binding mode listing
 */
export const BrokerageBindModeEnum = {
  ANYTIME: {
    mode: 1,
    name: 'First binding.',
  },
  REGISTER: {
    mode: 2,
    name: 'Registered for binding.',
  },
  OVERRIDE: {
    mode: 3,
    name: 'Overwrite Binding',
  },
};
/**
 * Enumeration of part-timers
 */
export const BrokerageEnabledConditionEnum = {
  ALL: {
    condition: 1,
    name: 'Distribution for all',
  },
  ADMIN: {
    condition: 2,
    name: 'Specified distribution',
  },
};
/**
 * Inventory of commission recording business type
 */
export const BrokerageRecordBizTypeEnum = {
  ORDER: {
    type: 1,
    name: 'Obtaining promotion commission',
  },
  WITHDRAW: {
    type: 2,
    name: 'Request for payment',
  },
};
/**
 * Commission's current status, e.g.
 */
export const BrokerageWithdrawStatusEnum = {
  AUDITING: {
    status: 0,
    name: 'Under review',
  },
  AUDIT_SUCCESS: {
    status: 10,
    name: 'Audited and approved',
  },
  AUDIT_FAIL: {
    status: 20,
    name: "We can't approve it.",
  },
  WITHDRAW_SUCCESS: {
    status: 11,
    name: "It's a success.",
  },
  WITHDRAW_FAIL: {
    status: 21,
    name: 'Synchronising folder failed: %s: %s',
  },
};
/**
 * Excerpts for commission type
 */
export const BrokerageWithdrawTypeEnum = {
  WALLET: {
    type: 1,
    name: 'Wallet.',
  },
  BANK: {
    type: 2,
    name: 'Bank card',
  },
  WECHAT: {
    type: 3,
    name: 'Can not open message',
  },
  ALIPAY: {
    type: 4,
    name: 'Pay the treasure.',
  },
};

/**
 * Enumeration of the mode of distribution
 */
export const DeliveryTypeEnum = {
  EXPRESS: {
    type: 1,
    name: 'Quick delivery.',
  },
  PICK_UP: {
    type: 2,
    name: "We'll talk about it at the store.",
  },
};
/**
 * Trade Order - Status
 */
export const TradeOrderStatusEnum = {
  UNPAID: {
    status: 0,
    name: 'To be paid',
  },
  UNDELIVERED: {
    status: 10,
    name: 'To be delivered',
  },
  DELIVERED: {
    status: 20,
    name: 'Shipped',
  },
  COMPLETED: {
    status: 30,
    name: 'Completed',
  },
  CANCELED: {
    status: 40,
    name: 'Cancelled',
  },
};

// ========== ERP - Enterprise Resource Plan==========

export const ErpBizType = {
  PURCHASE_ORDER: 10,
  PURCHASE_IN: 11,
  PURCHASE_RETURN: 12,
  SALE_ORDER: 20,
  SALE_OUT: 21,
  SALE_RETURN: 22,
};

// ========== BPM Module==========

// Candidate strategy list (for approval node. copy node)
export enum BpmCandidateStrategyEnum {
  /**
   * Approving person's choice
   */
  APPROVE_USER_SELECT = 34,
  /**
   * Heads of departments
   */
  DEPT_LEADER = 21,
  /**
   * Sector members
   */
  DEPT_MEMBER = 20,
  /**
   * Process Expression
   */
  EXPRESSION = 60,
  /**
   * Heads of department in form
   */
  FORM_DEPT_LEADER = 51,
  /**
   * User Fields in Form
   */
  FORM_USER = 50,
  /**
   * Heads of successive multi-level departments
   */
  MULTI_LEVEL_DEPT_LEADER = 23,
  /**
   * Designated posts
   */
  POST = 22,
  /**
   * Assign a role
   */
  ROLE = 10,
  /**
   * The initiator himself.
   */
  START_USER = 36,
  /**
   * Head of Department of Sponsors
   */
  START_USER_DEPT_LEADER = 37,
  /**
   * Head of successive multi-level departments
   */
  START_USER_MULTI_LEVEL_DEPT_LEADER = 38,
  /**
   * The initiator chooses himself.
   */
  START_USER_SELECT = 35,
  /**
   * Specify User
   */
  USER = 30,
  /**
   * Specify User Group
   */
  USER_GROUP = 40,
}

/**
 * Node Type
 */
export enum BpmNodeTypeEnum {
  /**
   * Subflow Node
   */
  CHILD_PROCESS_NODE = 20,
  /**
   * Conditional Branch Node
   */
  CONDITION_BRANCH_NODE = 51,
  /**
   * Conditional Node
   */
  CONDITION_NODE = 50,

  /**
   * Can not open message
   */
  COPY_TASK_NODE = 12,

  /**
   * Delayer Node
   */
  DELAY_TIMER_NODE = 14,

  /**
   * End Node
   */
  END_EVENT_NODE = 1,

  /**
   * Inclusion Branch Node (comparable inclusion gateway)
   */
  INCLUSIVE_BRANCH_NODE = 53,

  /**
   * Parallel branch nodes (comparable gateway)
   */
  PARALLEL_BRANCH_NODE = 52,

  /**
   * Route Branch Node
   */
  ROUTER_BRANCH_NODE = 54,
  /**
   * Launcher Node
   */
  START_USER_NODE = 10,
  /**
   */
  TRANSACTOR_NODE = 13,

  /**
   * Trigger Node
   */
  TRIGGER_NODE = 15,
  /**

   */
  USER_TASK_NODE = 11,
}

/**
 *  Process Job Operation Button
 */
export enum BpmTaskOperationButtonTypeEnum {
  /**
   * Add
   */
  ADD_SIGN = 5,
  /**
   * Pass.
   */
  APPROVE = 1,
  /**
   * Copy
   */
  COPY = 7,
  /**
   * Assignments
   */
  DELEGATE = 4,
  /**
   * Reject
   */
  REJECT = 2,
  /**
   * Back up.
   */
  RETURN = 6,
  /**
   * Transfer
   */
  TRANSFER = 3,
}

/**
 */
export enum BpmTaskStatusEnum {
  /**
   * Approved.
   */
  APPROVE = 2,
  /**
   * Approval is in progress.
   */
  APPROVING = 7,

  /**
   * Cancelled
   */
  CANCEL = 4,
  /**
   * Not started
   */
  NOT_START = -1,
  /**
   * Permission denied.
   */
  REJECT = 3,

  /**
   * Returned
   */
  RETURN = 5,

  /**
   * Approval in progress
   */
  RUNNING = 1,
  /**
   * Skip
   */
  SKIP = -2,
  /**
   * Pending approval
   */
  WAIT = 0,
}

/**
 * Node Id Enumeration
 */
export enum BpmNodeIdEnum {
  /**
   * Launcher Node Id
   */
  END_EVENT_NODE_ID = 'EndEvent',

  /**
   * Launcher Node Id
   */
  START_USER_NODE_ID = 'StartUserNode',
}

/**
 * Enumeration of permissions to form
 */
export enum BpmFieldPermissionType {
  /**
   * Hide
   */
  NONE = '3',
  /**
   * Read-only
   */
  READ = '1',
  /**
   * Edit
   */
  WRITE = '2',
}

/**
 * Process model type
 */
export const BpmModelType = {
  BPMN: 10, // BPMN Designer
  SIMPLE: 20, // Simple Designer
};

/**
 * Process model form type
 */
export const BpmModelFormType = {
  NORMAL: 10, // Flowsheet
  CUSTOM: 20, // Operational forms
};

/**
 * Process Example Status
 */
export const BpmProcessInstanceStatus = {
  NOT_START: -1, // Not started
  RUNNING: 1, // Approval in progress
  APPROVE: 2, // Approved.
  REJECT: 3, // Permission denied.
  CANCEL: 4, // Cancelled
};

/**
 * Automatic approval type
 */
export const BpmAutoApproveType = {
  NONE: 0, // Do Not Automatically Pass
  APPROVE_ALL: 1, // Approval only once, and subsequent duplicate approval nodes automatically pass
  APPROVE_SEQUENT: 2, // Automatically only for consecutive approval nodes
};

/**
 */
export const OPERATION_BUTTON_NAME = new Map<number, string>();
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.APPROVE, 'Pass.');
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.REJECT, 'Reject');
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.TRANSFER, 'Transfer');
OPERATION_BUTTON_NAME.set(
  BpmTaskOperationButtonTypeEnum.DELEGATE,
  'Assignments',
);
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.ADD_SIGN, 'Add');
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.RETURN, 'Back up.');
OPERATION_BUTTON_NAME.set(BpmTaskOperationButtonTypeEnum.COPY, 'Copy');

/**
 * Variables for Process Examples
 */
export enum ProcessVariableEnum {
  /**
   * Process definition name
   */
  PROCESS_DEFINITION_NAME = 'PROCESS_DEFINITION_NAME',
  /**
   * Launch Time
   */
  START_TIME = 'PROCESS_START_TIME',
  /**
   * Launch user ID
   */
  START_USER_ID = 'PROCESS_START_USER_ID',
}
// ========== [write UI]==========

/** Writing data when clicking on an example */
export const WriteExample = {
  write: {
    prompt: 'vue',
    data: 'Vue.js is a progressive JavaScript framework used to build user interfaces. The core library focuses only on view layers, easy access, and integration with other libraries or existing projects. \n\nVue.js features include: \n\n-responsive data binding: Vue.js automatically synchronizes data with DOM, making state management simpler. \n-assembly: Vue.js allows developers to build large applications through small, independent and normally recyclable components. \n-intended components, \n-tweaking devices, \n-tweaking devices, etc. \n-tweaking devices, \n-tweaking devices, \n-tweaking devices, \n-tweaks, \tweaks, \tweaks, \tweaks, \n-tweaks, \tweaks, \tweaks, \tweaks, \t-weets, \t-weaks.These have greatly enriched the development ecology of Vue.js. In general, Vue.js is a flexible and efficient front-end framework for development from small-scale projects to large-scale enterprise-level applications. Its accessibility, flexibility, and strong community support make it one of the preferred frameworks for many developers.',
  },
  reply: {
    originalContent: "Sir, I'd like to take a leave of absence.",
    prompt: 'Non-approval',
    data: 'Your application for leave has been received and has been verified and considered, it is not possible for the time being to approve your application for leave.',
  },
};

// ========== List of references to UI==========

/** An example of content generation already exists in the mind chart */
export const MindMapContentExample = ``;

// Preset Colours
export const PREDEFINE_COLORS = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#409EFF',
  '#909399',
  '#C0C4CC',
  '#b7390b',
  '#ff7800',
  '#fad400',
  '#5b8c5f',
  '#00babd',
  '#1f73c3',
  '#711f57',
];
