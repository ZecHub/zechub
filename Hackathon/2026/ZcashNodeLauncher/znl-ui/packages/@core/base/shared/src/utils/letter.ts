/**
 * Capitalize the initials of the string* @param string
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts the initials of the string to lowercase. * @paramstr string to convert * @returns initial shortcase string
 */
function toLowerCaseFirstLetter(str: string): string {
  if (!str) return str; // Returns the string directly if it is empty
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 *  Keyname to Generate Camel Peak Name * @param key * @param parentKey
 */
function toCamelCase(key: string, parentKey: string): string {
  if (!parentKey) {
    return key;
  }
  return parentKey + key.charAt(0).toUpperCase() + key.slice(1);
}

function kebabToCamelCase(str: string): string {
  return str
    .split('-')
    .filter(Boolean)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('');
}

export {
  capitalizeFirstLetter,
  kebabToCamelCase,
  toCamelCase,
  toLowerCaseFirstLetter,
};