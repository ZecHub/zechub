import { describe, expect, it } from 'vitest';

import { defaultPreferences } from '../src/config';

describe('defaultPreferences immutability test', () => {
  // Create snapshot to ensure that the default configuration object is not modified
  it('should not modify the config object', () => {
    expect(defaultPreferences).toMatchSnapshot();
  });
});