/**
 * weight the object array according to the given field * @param arr To weigh the object array * @param key to re-reference the field name @returns to re-heavy the object array
 */
function uniqueByField<T>(arr: T[], key: keyof T): T[] {
  const seen = new Map<any, T>();
  return arr.filter((item) => {
    const value = item[key];
    return seen.has(value) ? false : (seen.set(value, item), true);
  });
}

export { uniqueByField };