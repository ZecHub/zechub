import { TinyColor } from '@ctrl/tinycolor';

/**
 * Converts a colour to a HSL format. * HSL is a colour model that includes three parts, Hue, Saturization and Lightness. * * Colours entered by @param{string} color. * Colour string in the @returns{string} HSL format.
 */
function convertToHsl(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
  return a < 1 ? `${hsl} ${a}` : hsl;
}

/**
 * Converts colours to HSL CSS variables. * * This function is similar to the ConvertToHsl function, but the string format returned is slightly different * so that it can be used as a CSS variable. * @param{string} color input colour. * @returns{string} Colour string that can be used as a HSL format for CSS variables.
 */
function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  return a < 1 ? `${hsl} / ${a}` : hsl;
}

/**
 * Converting colours to RGB colour string * TinyColor cannot process hsl with string'deg','grad','rad' or'turn' * e.g. hsl (231 deg 98% 65%) will be parsed to rgb (0, 0) * here to remove these units before conversion * @paramstr for HLS colour value * @returns returns the corresponding RGB colour string if the colour value is valid; if not valid, returns rgb (0, 0, 0)
 */
function convertToRgb(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString();
}

/**
 * Check if the colour is valid * @param{string} color - colour to be checked * If the colour is validly returned to True, otherwise return false
 */
function isValidColor(color?: string) {
  if (!color) {
    return false;
  }
  return new TinyColor(color).isValid;
}

export {
  convertToHsl,
  convertToHslCssVar,
  convertToRgb,
  isValidColor,
  TinyColor,
};