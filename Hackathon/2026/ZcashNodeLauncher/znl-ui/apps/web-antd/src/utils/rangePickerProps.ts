import dayjs from 'dayjs';

import { $t } from '#/locales';

/** Period Selector Extension */
export function getRangePickerDefaultProps() {
  return {
    // Sets the date format, supports multi-format matching in the number of groups, and displays the first preference. Configure dayjs, supports custom formatting
    format: 'YYYY-MM-DD HH:mm:ss',
    // Format for binding values, working for value, defaultValue, defaultPickerValue. Do not specify binding values as dayjs objects
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    // Enter box hint text
    placeholder: [
      $t('utils.rangePicker.beginTime'),
      $t('utils.rangePicker.endTime'),
    ],
    // Shortcut time frame
    presets: [
      {
        label: $t('utils.rangePicker.today'),
        value: [dayjs().startOf('day'), dayjs().endOf('day')],
      },
      {
        label: $t('utils.rangePicker.last7Days'),
        value: [
          dayjs().subtract(7, 'day').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: $t('utils.rangePicker.last30Days'),
        value: [
          dayjs().subtract(30, 'day').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: $t('utils.rangePicker.yesterday'),
        value: [
          dayjs().subtract(1, 'day').startOf('day'),
          dayjs().subtract(1, 'day').endOf('day'),
        ],
      },
      {
        label: $t('utils.rangePicker.thisWeek'),
        value: [dayjs().startOf('week'), dayjs().endOf('day')],
      },
      {
        label: $t('utils.rangePicker.thisMonth'),
        value: [dayjs().startOf('month'), dayjs().endOf('day')],
      },
      {
        label: $t('utils.rangePicker.lastWeek'),
        value: [
          dayjs().subtract(1, 'week').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
    ],
    showTime: {
      defaultValue: [
        dayjs('00:00:00', 'HH:mm:ss'),
        dayjs('23:59:59', 'HH:mm:ss'),
      ],
      format: 'HH:mm:ss',
    },
  };
}