export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype);

  propertyNames.forEach((propertyName) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
    const propertyValue = instance[propertyName as keyof T];

    if (
      typeof propertyValue === 'function' &&
      propertyName !== 'constructor' &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance);
    }
  });
}

/**
 * Get field values for embedded objects * @param obj - the object to look for * @param path - the path to find fields, use decimal points to separate *returns field values, or return undefefined if found
 */
export function getNestedValue<T>(obj: T, path: string): any {
  if (typeof path !== 'string' || path.length === 0) {
    throw new Error('Path must be a non-empty string');
  }
  // Split path string into arrays by pressing ". "
  const keys = path.split('.') as (number | string)[];

  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key as keyof typeof current];
  }

  return current;
}

/**
 * Getting the parameter value of the link (value type) * @param key parameter name * @param urlStr link address, default being the address of the current browser
 */
export function getUrlNumberValue(
  key: string,
  urlStr: string = location.href,
): number {
  return Number(getUrlValue(key, urlStr));
}

/**
 * Getting the parameter value of the link * @param key parameter name * @param urlstr link address, defaulting to the address of the current browser
 */
export function getUrlValue(
  key: string,
  urlStr: string = location.href,
): string {
  if (!urlStr || !key) return '';
  const url = new URL(decodeURIComponent(urlStr));
  return url.searchParams.get(key) ?? '';
}

/**
 * Copy the value to the target object, with reference to the object properties, for example: target: {a) {a:2, b:3} The result is: {a:2} * @param target object * @param source object
 */
export function copyValueToTarget(target: any, source: any) {
  const newObj = Object.assign({}, target, source);
  // Remove redundant properties
  Object.keys(newObj).forEach((key) => {
    // Delete if not properties in target
    if (!Object.keys(target).includes(key)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newObj[key];
    }
  });
  // Update Target Object Values
  Object.assign(target, newObj);
}

/** Achieve groupby functions */
export function groupBy(array: any[], key: string) {
  const result: Record<string, any[]> = {};
  for (const item of array) {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }
  return result;
}