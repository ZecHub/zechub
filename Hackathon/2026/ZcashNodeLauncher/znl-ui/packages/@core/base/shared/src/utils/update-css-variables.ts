/**
 * Update function of CSS variable * @paramvariables map of CSS variable with its new value to update
 */
function updateCSSVariables(
  variables: { [key: string]: string },
  id = '__vben-styles__',
): void {
  // Retrieve or create links to stylesheet elements
  const styleElement =
    document.querySelector(`#${id}`) || document.createElement('style');

  styleElement.id = id;

  // Build style text for CSS variables to update
  let cssText = ':root {';
  for (const key in variables) {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      cssText += `${key}: ${variables[key]};`;
    }
  }
  cssText += '}';

  // Give style text value to the federated stylesheet
  styleElement.textContent = cssText;

  // Add Federation Style Sheets to the head of the document
  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      document.head.append(styleElement);
    });
  }
}

export { updateCSSVariables };