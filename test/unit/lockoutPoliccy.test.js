import { describe, expect, it } from 'vitest';
import { isLocked, LOCK_DURATION_MS, LOCK_THRESHOLD, registerFaliure } from '../../src/domain/lockoutPolicy.js';


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

describe('registerFaliure - calcula cambios tras un intento fallido', () => {

    it('incrementa failedAttempts y NO incluye lockedUntil por debajo del umbral', () => {
        const now = 1_000_000;
        const changes = registerFaliure({ failedAttempts: 0, now });
        const changes2 = registerFaliure({ failedAttempts: 1, now });

        expect(changes.lockedUntil).toBeUndefined();
        expect(changes.failedAttempts).toBe(1);
        expect(changes2.lockedUntil).toBeUndefined();
        expect(changes2.failedAttempts).toBe(2);
    });

    it('incluye lockedUntil = now + LOCK_DURATION_MS al alcanzar el umbral', () => {
        const now = 1_000_000;
        const changes = registerFaliure({ failedAttempts: LOCK_THRESHOLD - 1, now });
        expect(changes.failedAttempts).toBe(LOCK_THRESHOLD);
        expect(changes.lockedUntil).toBe(now + LOCK_DURATION_MS);
    });

})

