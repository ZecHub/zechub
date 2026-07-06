import dayjs, { Dayjs } from 'dayjs';

export function formatDate(
  time: Date | Dayjs | number | string | undefined,
  format = 'YYYY-MM-DD',
) {
  if (!time) {
    return time;
  }
  try {
    const date = dayjs(time);
    if (!date.isValid()) {
      throw new Error('Invalid date');
    }
    return date.format(format);
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    return time;
  }
}

export function formatDateTime(
  time: Date | Dayjs | number | string | undefined,
) {
  if (!time) {
    return time;
  }
  return formatDate(time, 'YYYY-MM-DD HH:mm:ss');
}

export function formatDate2(date: Date, format?: string): string {
  // Date does not exist, returns empty
  if (!date) {
    return '';
  }
  // Date exists, formatting
  return date ? dayjs(date).format(format ?? 'YYYY-MM-DD HH:mm:ss') : '';
}

export function isDate(value: any): value is Date {
  return value instanceof Date;
}

export function isDayjsObject(value: any): value is dayjs.Dayjs {
  return dayjs.isDayjs(value);
}

/**
 * Time when message plus is realized in YYYY-MM-DD HH:mm:ss * @param_row * @param_colomn * @param cellValue field values
 */
export function dateFormatter(_row: any, _column: any, cellValue: any): string {
  return cellValue ? formatDate(cellValue)?.toString() || '' : '';
}