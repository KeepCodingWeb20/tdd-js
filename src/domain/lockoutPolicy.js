
export const LOCK_THRESHOLD = 3;
export const LOCK_DURATION_MS = 15 * 60 * 1000;

// La cuenta esta bloqueada?
export function isLocked({ lockedUntil, now }) {
    return Boolean(lockedUntil && now < lockedUntil) 
};