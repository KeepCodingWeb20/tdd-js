import { describe, it, expect } from 'vitest';
import { maskEmail } from '../../src/utils';

it('Deve remplazar la parte local con *** conservando solo el primer carácter', () => {
    expect(maskEmail('ana.garcia@example.com')).toBe('a***@example.com');
    expect(maskEmail('nauel.gomez@keep.coding')).toBe('n***@keep.coding');
});