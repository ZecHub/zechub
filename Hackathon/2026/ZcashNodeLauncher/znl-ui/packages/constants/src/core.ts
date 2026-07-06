/**
 * @zh_CN login page url address
 */
export const LOGIN_PATH = '/auth/login';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN';
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: 'CREDIT_FOR_TRANSLATORS',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];