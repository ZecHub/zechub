import { isEmpty, isString, isUndefined } from './inference';

/**
 * Convert an integer to a fraction to keep an incoming decimal * @paramnum * @param digit
 */
export function formatToFractionDigit(
  num: number | string | undefined,
  digit: number = 2,
): string {
  if (isUndefined(num)) return '0.00';
  const parsedNumber = isString(num) ? Number.parseFloat(num) : num;
  return (parsedNumber / 100).toFixed(digit);
}

/**
 * Keep two decimals for converting an integer to a fraction* @paramnum
 */
export function formatToFraction(num: number | string | undefined): string {
  return formatToFractionDigit(num, 2);
}

/**
 * Convert a number to 1.00 so * Use * @paramnum integer for data presentation
 */
export function floatToFixed2(num: number | string | undefined): string {
  let str = '0.00';
  if (isUndefined(num)) return str;
  const f = formatToFraction(num);
  const decimalPart = f.toString().split('.')[1];
  const len = decimalPart ? decimalPart.length : 0;
  switch (len) {
    case 0: {
      str = `${f.toString()}.00`;
      break;
    }
    case 1: {
      str = `${f.toString()}0`;
      break;
    }
    case 2: {
      str = f.toString();
      break;
    }
  }
  return str;
}

/**
 * Convert a fraction to an integer *@paramnum
 */
export function convertToInteger(num: number | string | undefined): number {
  if (isUndefined(num)) return 0;
  const parsedNumber = isString(num) ? Number.parseFloat(num) : num;
  return Math.round(parsedNumber * 100);
}

/**
 * Cent
 */
export function yuanToFen(amount: number | string): number {
  return convertToInteger(amount);
}

/**
 * Centauri
 */
export function fenToYuan(price: number | string): string {
  return formatToFraction(price);
}

// Formatting Amount [Reciprocal Transfers]
export const fenToYuanFormat = (_: any, __: any, cellValue: any, ___: any) => {
  return `￥${floatToFixed2(cellValue)}`;
};

/**
 * Calculate ring comparison * * @param value current value * @param comparison
 */
export function calculateRelativeRate(
  value?: number,
  reference?: number,
): number {
  // Prevent division 0
  if (!reference || reference === 0) return 0;

  return Number.parseFloat(
    ((100 * ((value || 0) - reference)) / reference).toFixed(0),
  );
}

// ========== ERP Exclusive method==========

const ERP_COUNT_DIGIT = 3;
const ERP_PRICE_DIGIT = 2;

/**
 * [ERP] Format Input * e. g. inventory * * @param number * @package * @return formatted quantity
 */
export function erpNumberFormatter(
  num: number | string | undefined,
  digit: number,
) {
  if (num === null || num === undefined) {
    return '';
  }
  if (typeof num === 'string') {
    num = Number.parseFloat(num);
  }
  // If not number, return the empty string directly
  if (Number.isNaN(num)) {
    return '';
  }
  return num.toFixed(digit);
}

/**
 * [ERP] Formatted Quantities, with three decimals * * For example: Quantity of Stock * * Number of @param num * @return formatted Quantities
 */
export function erpCountInputFormatter(num: number | string | undefined) {
  return erpNumberFormatter(num, ERP_COUNT_DIGIT);
}

/**
 * [ERP] Formatted Quantity with 3 decimals * * @param cellValue * @return formatted Quantity
 */
export function erpCountTableColumnFormatter(cellValue: any) {
  return erpNumberFormatter(cellValue, ERP_COUNT_DIGIT);
}

/**
 * [ERP] Formatted amount, with two decimals * * For example: quantity of inventory * * Number of @param num * @return formatted quantity
 */
export function erpPriceInputFormatter(num: number | string | undefined) {
  return erpNumberFormatter(num, ERP_PRICE_DIGIT);
}

/**
 * [ERP] Format amount, keep two decimals* * @param cellValue * @return
 */
export function erpPriceTableColumnFormatter(cellValue: any) {
  return erpNumberFormatter(cellValue, ERP_PRICE_DIGIT);
}

/**
 * [ERP] price calculation, rounded to keep two decimals* * @param price * @param count * @return total price. Return unfined if any is empty
 */
export function erpPriceMultiply(price: number, count: number) {
  if (isEmpty(price) || isEmpty(count)) return undefined;
  return Number.parseFloat((price * count).toFixed(ERP_PRICE_DIGIT));
}

/**
 * [ERP] Percentage calculation, rounded to keep two decimals * * Returns 0 * @param value current value * @param total value *
 */
export function erpCalculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
}