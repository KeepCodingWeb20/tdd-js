const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Comprueba si el valor dado tiene formato de email válido.
 *
 * @param {string} email
 * @returns {boolean}
 * @throws {TypeError} Si `email` no es un string.
 *
 * @example
 * validateEmail('usuario@dominio.com') // true
 * validateEmail('mal-formato')         // false
 */
export function validateEmail(email) {
  if (typeof email !== 'string') {
    throw new TypeError('El email debe ser un string');
  }

  return EMAIL_REGEX.test(email);
}
