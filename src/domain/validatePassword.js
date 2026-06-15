const RULES = [
  {
    description: 'Debe tener al menos 8 caracteres',
    test: (pwd) => pwd.length >= 8,
  },
  {
    description: 'Debe contener al menos una letra mayúscula',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    description: 'Debe contener al menos un número',
    test: (pwd) => /[0-9]/.test(pwd),
  },
];

/**
 * Valida una contraseña contra las reglas definidas.
 *
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 *
 * @example
 * validatePassword('Hola1234') // { valid: true, errors: [] }
 * validatePassword('corta')   // { valid: false, errors: ['Debe tener al menos 8 caracteres', ...] }
 */
export function validatePassword(password) {
  const errors = RULES
    .filter((rule) => !rule.test(password))
    .map((rule) => rule.description);

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calcula la fortaleza de una contraseña como decimal entre 0 y 1.
 * El valor es proporcional a las reglas cumplidas: 0, 0.333..., 0.666... o 1.
 *
 * @param {string} password
 * @returns {number}
 *
 * @example
 * passwordStrength('abc')      // 0
 * passwordStrength('Abcdefgh') // 0.666...
 * passwordStrength('Abcdef1!') // 1
 */
export function passwordStrength(password) {
  const passed = RULES.filter((rule) => rule.test(password)).length;

  return passed / RULES.length;
}
