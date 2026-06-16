import { describe, expect, it } from 'vitest';
import { isLocked } from '../../src/domain/lockoutPolicy.js';


describe('isLocked - determina si la cuenta esta bloqueada', () => {

    it('retorna true si lockUntil sea futuro respecto a now', () => {
        const now = 1_000_000;
        expect(isLocked({ lockedUntil: now + 1000, now })).toBe(true);
    });

    it('retorna false si lockedUntil es pasado respecto a now', () => {
        const now = 1_000_000;
        expect(isLocked({ lockedUntil: now - 1000, now })).toBe(false);
    });

    it('retorna false si lockedUntil es null', () => {
        const now = 1_000_000;
        expect(isLocked({ now })).toBe(false);
    });

});