/**
 * Elimina espacios al inicio/final y convierte a minúsculas.
 *
 * @param {string} email
 * @returns {string}
 */
export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/**
 * Genera un nombre de usuario a partir de la parte local del email.
 * Elimina caracteres no alfanuméricos.
 *
 * @param {string} email
 * @returns {string}
 *
 * @example
 * generateUsername('ana.garcia@example.com') // 'anagarcia'
 * generateUsername('user+tag@mail.io')       // 'usertag'
 */
export function generateUsername(email) {
  const localPart = email.split('@')[0];

  return localPart.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

/**
 * Enmascara un email para mostrarlo sin exponer el valor real.
 * Conserva el primer carácter de la parte local y el dominio completo.
 *
 * @param {string} email
 * @returns {string}
 *
 * @example
 * maskEmail('ana.garcia@example.com') // 'a***@example.com'
 */
export function maskEmail(email) {
  const [local, domain] = email.split('@');

  return `${local[0]}***@${domain}`;
}
// TODO: Testear que reemplaza la parte 'local' con *** conservando la primera letra.

/**
 * Formatea un objeto Date a la cadena 'YYYY-MM-DD'.
 * Usa métodos UTC para que el resultado sea independiente de la zona horaria.
 *
 * @param {Date} date
 * @returns {string}
 *
 * @example
 * formatDate(new Date('2024-03-05')) // '2024-03-05'
 */
export function formatDate(date) {
  const year  = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day   = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Limita un número dentro de un rango [min, max].
 *
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 *
 * @example
 * clamp(5, 0, 10)  // 5
 * clamp(-3, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Trunca un texto a un máximo de caracteres. Si supera el límite, agrega '...'.
 *
 * @param {string} text
 * @param {number} max
 * @returns {string}
 *
 * @example
 * truncate('Hola mundo', 7) // 'Hola...'
 * truncate('Hola', 10)      // 'Hola'
 */
export function truncate(text, max) {
  if (text.length <= max) return text;

  return `${text.slice(0, max - 3)}...`;
}

/**
 * Convierte un texto a formato slug: minúsculas, sin acentos,
 * espacios y caracteres especiales reemplazados por guiones.
 *
 * @param {string} text
 * @returns {string}
 *
 * @example
 * slugify('Hola Mundo!')       // 'hola-mundo'
 * slugify('  Testing con JS ') // 'testing-con-js'
 */
export function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Determina si una puntuación supera un umbral mínimo.
 *
 * @param {number} score     - Valor entre 0 y 1.
 * @param {number} threshold - Umbral mínimo (entre 0 y 1).
 * @returns {boolean}
 *
 * @example
 * isStrongEnough(0.8, 0.6) // true
 * isStrongEnough(0.4, 0.6) // false
 */
export function isStrongEnough(score, threshold) {
  return score >= threshold;
}

/**
 * Genera un array de enteros consecutivos desde `start` hasta `end` (exclusive).
 *
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 *
 * @example
 * range(0, 5)  // [0, 1, 2, 3, 4]
 * range(3, 7)  // [3, 4, 5, 6]
 */
export function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

/**
 * Convierte la primera letra de un texto a mayúscula.
 * El resto del texto no se modifica.
 *
 * @param {string} text
 * @returns {string}
 *
 * @example
 * capitalize('hola mundo') // 'Hola mundo'
 * capitalize('javaScript') // 'JavaScript'
 */
export function capitalize(text) {
  if (!text) return text;

  return text[0].toUpperCase() + text.slice(1);
}

// ---------------------------------------------------------------------------
// passwordStrengthLabel: RESERVADA PARA IMPLEMENTAR CON TDD EN CLASE
// No está implementada en este archivo. Ver especificación en:
// docs/design/utils-tdd-reserve.md
// ---------------------------------------------------------------------------
