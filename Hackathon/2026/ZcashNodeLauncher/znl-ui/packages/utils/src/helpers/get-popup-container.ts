/**
 * If the node is holding inside a form, return the form element,
 * otherwise return the parent node of the given element or
 * the document body if the element is not provided.
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (
    node?.closest('form') ?? (node?.parentNode as HTMLElement) ?? document.body
  );
}

// TODO @xingyu: Does this need to pr to vben official? Physically, it's global.
/**
 * VxeTable special window layer
 * Addressing the problem: https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IB1DM3
 * The single form is the same as the one up there. Get PopupContainer.
 * One page (under body) has multiple table elements that must first specify the ID & ID parameter to enter the function
 * <BasicTable id="xxx" />
 * getVxePopupContainer="(node) => getVxePopupContainer(node, 'xxx')"
 * Element triggered by @param_node
 * @param id table only id when page (the window) has >= two tables must provide ID
 * @returns mount nodes
 */
export function getVxePopupContainer(
  _node?: HTMLElement,
  id?: string,
): HTMLElement {
  let selector = 'div.vxe-table--body-wrapper.body--wrapper';
  if (id) {
    selector = `div#${id} ${selector}`;
  }
  // Mount to a scrolling area in vxe-table
  const vxeTableContainerNode = document.querySelector(selector);
  if (!vxeTableContainerNode) {
    console.warn('Unable to find the vxe-table element, will be mounted to somebody.');
    return document.body;
  }
  return vxeTableContainerNode as HTMLElement;
}