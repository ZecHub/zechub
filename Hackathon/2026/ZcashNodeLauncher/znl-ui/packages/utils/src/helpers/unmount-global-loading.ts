/**
 * Remove and destroy the list * placed here instead of index.html's app tab because it's not hard enough, it's rendered too fast and it can be blinking * By adding an animated css to hide first, and removing a node at the end of the animation to improve the experience * The bad thing is to add some code amount * Custom listing can be found at https://doc.vben.pro/guide/in-depth/loading.html
 */
export function unmountGlobalLoading() {
  // Find global loading elements
  const loadingElement = document.querySelector('#__app-loading__');

  if (loadingElement) {
    // Add hidden class, trigger transition animation
    loadingElement.classList.add('hidden');

    // Find all input elements that need to be removed
    const injectLoadingElements = document.querySelectorAll(
      '[data-app-loading^="inject"]',
    );

    // Remove the loading element and all injected loading elements when the transition animation is over
    loadingElement.addEventListener(
      'transitionend',
      () => {
        loadingElement.remove(); // Remove loading elements
        injectLoadingElements.forEach((el) => el.remove()); // Remove all injected loading elements
      },
      { once: true },
    ); // Make sure the event only triggers once.
  }
}