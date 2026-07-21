import { beforeEach, describe, expect, it } from 'vitest';

import { loadScript } from '../resources';

const testJsPath =
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';

describe('loadScript', () => {
  beforeEach(() => {
    // Clear every test, head. Make sure the environment is clean.
    document.head.innerHTML = '';
  });

  it('should resolve when the script loads successfully', async () => {
    const promise = loadScript(testJsPath);

    // Script elements are created and inserted at this time
    const script = document.querySelector(
      `script[src="${testJsPath}"]`,
    ) as HTMLScriptElement;
    expect(script).toBeTruthy();

    // Simulation load successful
    script.dispatchEvent(new Event('load'));

    // Wait
    await expect(promise).resolves.toBeUndefined();
  });

  it('should not insert duplicate script and resolve immediately if already loaded', async () => {
    // Insert a script of the same src manually first
    const existing = document.createElement('script');
    existing.src = 'bar.js';
    document.head.append(existing);

    // Call again
    const promise = loadScript('bar.js');

    // Immediately resolve
    await expect(promise).resolves.toBeUndefined();

    // Keep only one of the head
    const scripts = document.head.querySelectorAll('script[src="bar.js"]');
    expect(scripts).toHaveLength(1);
  });

  it('should reject when the script fails to load', async () => {
    const promise = loadScript('error.js');

    const script = document.querySelector(
      'script[src="error.js"]',
    ) as HTMLScriptElement;
    expect(script).toBeTruthy();

    // Simulate Load Failed
    script.dispatchEvent(new Event('error'));

    await expect(promise).rejects.toThrow('Failed to load script: error.js');
  });

  it('should handle multiple concurrent calls and only insert one script tag', async () => {
    const p1 = loadScript(testJsPath);
    const p2 = loadScript(testJsPath);

    const script = document.querySelector(
      `script[src="${testJsPath}"]`,
    ) as HTMLScriptElement;
    expect(script).toBeTruthy();

    // Trigger a load, both promise should resolve
    script.dispatchEvent(new Event('load'));

    await expect(p1).resolves.toBeUndefined();
    await expect(p2).resolves.toBeUndefined();

    // Insert only once
    const scripts = document.head.querySelectorAll(
      `script[src="${testJsPath}"]`,
    );
    expect(scripts).toHaveLength(1);
  });
});