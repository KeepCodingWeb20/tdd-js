import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { login } from '../../src/services/userService.js';

// TODO: Mock de dependencias
vi.mock('../../src/infra/userRepository.js');
vi.mock('../../src/infra/hashPassword.js');

import * as userRepository from '../../src/infra/userRepository.js';
import * as hashPasswordModule from '../../src/infra/hashPassword.js';

// Setup de variables
const HASHED_PASSWORD = '$2b$10$hashedValueSimulado';
const VALID_EMAIL     = 'nuevo@example.com';
const VALID_PASSWORD  = 'SecurePass1';

const LOCK_DURATION_MS = 15 * 60 * 1000;
const LOCK_THRESHOLD = 3;

// Aislar individualmente cada test
beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('CA1 - bloqueo tras 3 intentos fallidos consecutivos', () => {

    it('Tras el 3r intento, llama a updateOne con lockedUnitl = now + 15 min', async () => {
        const NOW = new Date('2021-06-01T10:00:00.000Z').getTime();
        vi.setSystemTime(NOW);

        const userWith2Fail = {
            id: 'user-id-2',
            email: VALID_EMAIL,
            password: HASHED_PASSWORD,
            lockedUnitl: null,
            failedAttempts: 2
        };
        userRepository.findOne.mockResolvedValueOnce(userWith2Fail);
        hashPasswordModule.comparePassword.mockResolvedValueOnce(false);
        userRepository.updateOne.mockResolvedValueOnce({ ...userWith2Fail });

        try {
            await login({ email: VALID_EMAIL, password: 'error-pw' });
        } catch (e) { }

        expect(userRepository.updateOne).toHaveBeenCalledWith(
            { id: 'user-id-2' },
            {
                failedAttempts: 3,
                lockedUnitl: NOW + LOCK_DURATION_MS,
            }
        );
    });
})