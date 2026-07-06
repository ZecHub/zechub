import { beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageManager } from '../storage-manager';

describe('storageManager', () => {
  let storageManager: StorageManager;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    storageManager = new StorageManager({
      prefix: 'test_',
    });
  });

  it('should set and get an item', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('should return default value if item does not exist', () => {
    const user = storageManager.getItem('nonexistent', {
      age: 0,
      name: 'Default User',
    });
    expect(user).toEqual({ age: 0, name: 'Default User' });
  });

  it('should remove an item', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    storageManager.removeItem('user');
    const user = storageManager.getItem('user');
    expect(user).toBeNull();
  });

  it('should clear all items with the prefix', () => {
    storageManager.setItem('user1', { age: 30, name: 'John Doe' });
    storageManager.setItem('user2', { age: 25, name: 'Jane Doe' });
    storageManager.clear();
    expect(storageManager.getItem('user1')).toBeNull();
    expect(storageManager.getItem('user2')).toBeNull();
  });

  it('should clear expired items', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' }, 1000); // 1 second expired
    vi.advanceTimersByTime(1001); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    storageManager.clearExpiredItems();
    const user = storageManager.getItem('user');
    expect(user).toBeNull();
  });

  it('should not clear non-expired items', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' }, 10_000); // Expired in 10 seconds.
    vi.advanceTimersByTime(5000); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    storageManager.clearExpiredItems();
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('should handle JSON parse errors gracefully', () => {
    localStorage.setItem('test_user', '{ invalid JSON }');
    const user = storageManager.getItem('user', {
      age: 0,
      name: 'Default User',
    });
    expect(user).toEqual({ age: 0, name: 'Default User' });
  });
  it('should return null for non-existent items without default value', () => {
    const user = storageManager.getItem('nonexistent');
    expect(user).toBeNull();
  });

  it('should overwrite existing items', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    storageManager.setItem('user', { age: 25, name: 'Jane Doe' });
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 25, name: 'Jane Doe' });
  });

  it('should handle items without expiry correctly', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    vi.advanceTimersByTime(5000);
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('should remove expired items when accessed', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' }, 1000); // 1 second expired
    vi.advanceTimersByTime(1001); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    const user = storageManager.getItem('user');
    expect(user).toBeNull();
  });

  it('should not remove non-expired items when accessed', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' }, 10_000); // Expired in 10 seconds.
    vi.advanceTimersByTime(5000); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('should handle multiple items with different expiry times', () => {
    storageManager.setItem('user1', { age: 30, name: 'John Doe' }, 1000); // 1 second expired
    storageManager.setItem('user2', { age: 25, name: 'Jane Doe' }, 2000); // 2 seconds expired
    vi.advanceTimersByTime(1500); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    storageManager.clearExpiredItems();
    const user1 = storageManager.getItem('user1');
    const user2 = storageManager.getItem('user2');
    expect(user1).toBeNull();
    expect(user2).toEqual({ age: 25, name: 'Jane Doe' });
  });

  it('should handle items with no expiry', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    vi.advanceTimersByTime(10_000); // Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
    storageManager.clearExpiredItems();
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('should clear all items correctly', () => {
    storageManager.setItem('user1', { age: 30, name: 'John Doe' });
    storageManager.setItem('user2', { age: 25, name: 'Jane Doe' });
    storageManager.clear();
    const user1 = storageManager.getItem('user1');
    const user2 = storageManager.getItem('user2');
    expect(user1).toBeNull();
    expect(user2).toBeNull();
  });
});