export type Locale = 'en-US' | 'zh-CN';

export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    prompt: 'Prompt',
    reset: 'Reset',
    submit: 'Submit',
  },
  'zh-CN': {
    cancel: 'Cancel',
    collapse: 'Put it away.',
    confirm: 'Confirm',
    expand: 'Expand',
    prompt: 'Hint',
    reset: 'Reset',
    submit: 'Submit',
  },
};

export const getMessages = (locale: Locale) => messages[locale];