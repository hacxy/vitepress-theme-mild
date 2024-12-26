import { describe, expect, it } from 'vitest';
import { bootstrap } from '../src';

describe('cli template', () => {
  it('bootstrap', () => {
    expect(bootstrap()).toBeUndefined();
  });
});
