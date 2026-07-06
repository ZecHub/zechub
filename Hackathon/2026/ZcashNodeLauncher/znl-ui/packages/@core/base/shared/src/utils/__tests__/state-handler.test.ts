import { describe, expect, it } from 'vitest';

import { StateHandler } from '../state-handler';

describe('stateHandler', () => {
  it('should resolve when condition is set to true', async () => {
    const handler = new StateHandler();

    // Simulate Astral Settings Condition as True
    setTimeout(() => {
      handler.setConditionTrue(); 
    }, 10);

    // Waiting is set as true
    await handler.waitForCondition();
    expect(handler.isConditionTrue()).toBe(true);
  });

  it('should resolve immediately if condition is already true', async () => {
    const handler = new StateHandler();
    handler.setConditionTrue(); // Set in advance as true

    // Now resolve, because condition is already true
    await handler.waitForCondition();
    expect(handler.isConditionTrue()).toBe(true);
  });

  it('should reject when condition is set to false after waiting', async () => {
    const handler = new StateHandler();

    // Simulate Assortment Settings
    setTimeout(() => {
      handler.setConditionFalse(); 
    }, 10);

    // Expecting Promise to be rejected while waiting
    await expect(handler.waitForCondition()).rejects.toThrow();
    expect(handler.isConditionTrue()).toBe(false);
  });

  it('should reset condition to false', () => {
    const handler = new StateHandler();
    handler.setConditionTrue(); // Set as True
    handler.reset(); // Reset to False

    expect(handler.isConditionTrue()).toBe(false);
  });

  it('should resolve when condition is set to true after reset', async () => {
    const handler = new StateHandler();
    handler.reset(); // Make sure it starts as false

    setTimeout(() => {
      handler.setConditionTrue(); // Reset to True
    }, 10);

    await handler.waitForCondition();
    expect(handler.isConditionTrue()).toBe(true);
  });
});
