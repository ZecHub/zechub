import type NProgress from 'nprogress';

// Creates a variable for NProgress instance with an initial null
let nProgressInstance: null | typeof NProgress = null;

/**
 * * This function first checks whether the NProgress library has been loaded or, if loaded, returns the NProgress example. * Otherwise, the dynamic imports the NProgress library for configuration and returns the NProgress example. * The Promise object of the @returns NProgress example.
 */
async function loadNprogress() {
  if (nProgressInstance) {
    return nProgressInstance;
  }
  nProgressInstance = await import('nprogress');
  nProgressInstance.configure({
    showSpinner: true,
    speed: 300,
  });
  return nProgressInstance;
}

/**
 * * This function first loads the NProgress library and then calls the NProgress start method to start displaying the progress bar.
 */
async function startProgress() {
  const nprogress = await loadNprogress();
  nprogress?.start();
}

/**
 * * This function first loads the NProgress library and then calls the NProgress done method to stop and hide the progress bar.
 */
async function stopProgress() {
  const nprogress = await loadNprogress();
  nprogress?.done();
}

export { startProgress, stopProgress };