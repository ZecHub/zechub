import dayjs from 'dayjs';

import { formatDate } from './date';

/**
 * @param {Date  number string} time to convert * @param {string} fmt format to convert like yyyy-MM-dd, yyyy-MM-dd:mm:ss
 */
export function formatTime(time: Date | number | string, fmt: string) {
  if (time) {
    const date = new Date(time);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    const yearMatch = fmt.match(/y+/);
    if (yearMatch) {
      fmt = fmt.replace(
        yearMatch[0],
        `${date.getFullYear()}`.slice(4 - yearMatch[0].length),
      );
    }
    for (const k in o) {
      const match = fmt.match(new RegExp(`(${k})`));
      if (match) {
        fmt = fmt.replace(
          match[0],
          match[0].length === 1
            ? (o[k as keyof typeof o] as any)
            : `00${o[k as keyof typeof o]}`.slice(
                `${o[k as keyof typeof o]}`.length,
              ),
        );
      }
    }
    return fmt;
  } else {
    return '';
  }
}

/**
 * Retrieving the current date is the first week * @param datetime current date date value * @returns returns the number in the first week
 */
export function getWeek(dateTime: Date): number {
  const temptTime = new Date(dateTime);
  // What day is it?
  const weekday = temptTime.getDay() || 7;
  // 1+5 days = Saturday
  temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
  let firstDay = new Date(temptTime.getFullYear(), 0, 1);
  const dayOfWeek = firstDay.getDay();
  let spendDay = 1;
  if (dayOfWeek !== 0) spendDay = 7 - dayOfWeek + 1;
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
  const d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86_400_000);
  return Math.ceil(d / 7);
}

/**
 * Converting time to `seconds ago ', `minutes ago ', `hours ago ', `days ago'* @param param current time, new Date() format or string time format * @paramform format string for conversion * @description param 10 seconds: 10 * 1000 * @description param 1: 60 *  description param 1 hour: 60 * 1000 * @descracy param 24 hours * 60 * 24 * 1000 * @descracy param 3 days: 60 * 24 * 1000 * time string after @returns return
 */
export function formatPast(
  param: Date | string,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  // Enter format processing, store conversions
  let s: number, t: any;
  // Fetch js timetamps
  let time: number = Date.now();
  // Whether or not to be an object
  typeof param === 'string' || typeof param === 'object'
    ? (t = new Date(param).getTime())
    : (t = param);
  // Current time stamp - Enter time stamp
  time = Number.parseInt(`${time - t}`);
  if (time < 10_000) {
    // In 10 seconds.
    return 'Just now.';
  } else if (time < 60_000 && time >= 10_000) {
    // More than 10 seconds less than 1 minute
    s = Math.floor(time / 1000);
    return `${s}seconds ago`;
  } else if (time < 3_600_000 && time >= 60_000) {
    // Less than one hour in more than one minute
    s = Math.floor(time / 60_000);
    return `It's just ${s} minutes ago.`;
  } else if (time < 86_400_000 && time >= 3_600_000) {
    // Less than 24 hours for more than 1 hour
    s = Math.floor(time / 3_600_000);
    return `It was ${s} hour ago.`;
  } else if (time < 259_200_000 && time >= 86_400_000) {
    // Less than 3 days for more than 1 day
    s = Math.floor(time / 86_400_000);
    return `${s} Days ago`;
  } else {
    // More than 3 days
    const date =
      typeof param === 'string' || typeof param === 'object'
        ? new Date(param)
        : param;
    return formatDate(date, format) as string;
  }
}

/**
 * Time greeting * @param param current time, new Date() format * @description param calls `formatAxis(new Date()) 'out `Good Morning'* @returns returned the time string after the spell
 */
export function formatAxis(param: Date): string {
  const hour: number = new Date(param).getHours();
  if (hour < 6) return 'Good morning.';
  else if (hour < 9) return 'Good morning.';
  else if (hour < 12) return 'Good morning.';
  else if (hour < 14) return 'Good afternoon.';
  else if (hour < 17) return 'Good afternoon.';
  else if (hour < 19) return 'Good evening.';
  else if (hour < 22) return 'Good evening.';
  else return 'Good night.';
}

/**
 * Converts milliseconds to a time string. For example, xx minutes* @param msms * @returns {string} string
 */
export function formatPast2(ms: number): string {
  const day = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hour = Math.floor(ms / (60 * 60 * 1000) - day * 24);
  const minute = Math.floor(ms / (60 * 1000) - day * 24 * 60 - hour * 60);
  const second = Math.floor(
    ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60,
  );
  if (day > 0) {
    return `${day} Days ${hour} Hours ${minute} Minutes`;
  }
  if (hour > 0) {
    return `${hour} Hours`;
  }
  if (minute > 0) {
    return `$ {minute} Minutes`;
  }
  return second > 0 ? `${second}second` : `ms`;
}

/**
 * Sets the start date at 00:00:00 * @param param entry date * @returns with time 00:00 :00 date
 */
export function beginOfDay(param: Date): Date {
  return new Date(
    param.getFullYear(),
    param.getMonth(),
    param.getDate(),
    0,
    0,
    0,
  );
}

/**
 * Set end date at 23:59:59 * @param param entry date * @returns with time 23:59:59
 */
export function endOfDay(param: Date): Date {
  return new Date(
    param.getFullYear(),
    param.getMonth(),
    param.getDate(),
    23,
    59,
    59,
  );
}

/**
 * Calculate the number of days between days* @param param1 date1 * @param param2 date2
 */
export function betweenDay(param1: Date, param2: Date): number {
  param1 = convertDate(param1);
  param2 = convertDate(param2);
  // Calculate margin
  return Math.floor((param2.getTime() - param1.getTime()) / (24 * 3600 * 1000));
}

/**
 * Date Calculating * @param param1 Date * @param param2 Added Time
 */
export function addTime(param1: Date, param2: number): Date {
  param1 = convertDate(param1);
  return new Date(param1.getTime() + param2);
}

/**
 * Date Conversion * @param param date
 */
export function convertDate(param: Date | string): Date {
  if (typeof param === 'string') {
    return new Date(param);
  }
  return param;
}

/**
 * Specified two dates, whether or not to be the same day * @param a date A * @paramb date B
 */
export function isSameDay(a: dayjs.ConfigType, b: dayjs.ConfigType): boolean {
  if (!a || !b) return false;

  const aa = dayjs(a);
  const bb = dayjs(b);
  return (
    aa.year() === bb.year() &&
    aa.month() === bb.month() &&
    aa.day() === bb.day()
  );
}

/**
 * Get day start time, deadline * @param date * @param days
 */
export function getDayRange(
  date: dayjs.ConfigType,
  days: number,
): [dayjs.ConfigType, dayjs.ConfigType] {
  const day = dayjs(date).add(days, 'd');
  return getDateRange(day, day);
}

/**
 * Get the most recent 7-day start date, deadline
 */
export function getLast7Days(): [dayjs.ConfigType, dayjs.ConfigType] {
  const lastWeekDay = dayjs().subtract(7, 'd');
  const yesterday = dayjs().subtract(1, 'd');
  return getDateRange(lastWeekDay, yesterday);
}

/**
 * Get the last 30 days of start time, deadline
 */
export function getLast30Days(): [dayjs.ConfigType, dayjs.ConfigType] {
  const lastMonthDay = dayjs().subtract(30, 'd');
  const yesterday = dayjs().subtract(1, 'd');
  return getDateRange(lastMonthDay, yesterday);
}

/**
 * Get start date, deadline for the last year
 */
export function getLast1Year(): [dayjs.ConfigType, dayjs.ConfigType] {
  const lastYearDay = dayjs().subtract(1, 'y');
  const yesterday = dayjs().subtract(1, 'd');
  return getDateRange(lastYearDay, yesterday);
}

/**
 * Retrieve start time, deadline for specified date * @param beginDate start date * @param endDate cut-off date
 */
export function getDateRange(
  beginDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType,
): [string, string] {
  return [
    dayjs(beginDate).startOf('d').format('YYYY-MM-DD HH:mm:ss'),
    dayjs(endDate).endOf('d').format('YYYY-MM-DD HH:mm:ss'),
  ];
}
