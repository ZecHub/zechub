/**
 * Tool function to create authentication class names * @param is Validading Validation Status * @param fieldName field name * @param valuerules authentication rules, which can be string or custom functions * @returns returns the className function
 */
function createValidationClassName(
  isValidating: any,
  fieldName: string,
  validationRules: ((row: any) => boolean) | string,
) {
  return ({ row }: { row: any }) => {
    if (!isValidating?.value) return '';

    let isValid = true;
    if (typeof validationRules === 'string') {
      // Handle simple authentication rules
      if (validationRules === 'required') {
        isValid =
          fieldName === 'count'
            ? row[fieldName] && row[fieldName] > 0
            : !!row[fieldName];
      }
    } else if (typeof validationRules === 'function') {
      // Handle custom authentication functions
      isValid = validationRules(row);
    }

    return isValid ? '' : 'required-field-error';
  };
}

/**
 * Create mandatory field validation * @param isValidading authentication status * @param fieldName field name * @returns returns bluesName function
 */
function createRequiredValidation(isValidating: any, fieldName: string) {
  return createValidationClassName(isValidating, fieldName, 'required');
}

/**
 * Create Custom Authentication * @param isValidading Authentication Status * @param valuationFn Custom Authentication Function * @returns returns className function
 */
function createCustomValidation(
  isValidating: any,
  validationFn: (row: any) => boolean,
) {
  return createValidationClassName(isValidating, '', validationFn);
}

export {
  createCustomValidation,
  createRequiredValidation,
  createValidationClassName,
};