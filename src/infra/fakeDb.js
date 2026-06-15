import { randomUUID } from 'node:crypto';
import seedData from '../../data/users.json' with { type: 'json' };

let records = structuredClone(seedData);

/**
 * Devuelve una copia de todos los registros.
 *
 * @returns {Promise<object[]>}
 */
export async function findAll() {
  return structuredClone(records);
}

/**
 * Inserta un nuevo registro y devuelve el registro guardado con su id asignado.
 *
 * @param {object} record - Datos a guardar (sin id).
 * @returns {Promise<object>}
 */
export async function insert(record) {
  const newRecord = {
    id: randomUUID(),
    ...record,
  };
  records.push(newRecord);

  return structuredClone(newRecord);
}

/**
 * Actualiza un registro identificado por su id.
 * Solo modifica los campos indicados en `changes`.
 *
 * @param {string} id
 * @param {object} changes
 * @returns {Promise<object|null>} El registro actualizado, o null si no existe.
 */
export async function updateById(id, changes) {
  const index = records.findIndex((r) => r.id === id);

  if (index === -1) {
    return null;
  }

  records[index] = { ...records[index], ...changes };

  return structuredClone(records[index]);
}

/**
 * Reinicia el estado en memoria al seed original (o a un seed personalizado).
 * Necesario para que los tests sean independientes entre si.
 *
 * @param {object[]|null} [seed=null]
 * @returns {Promise<void>}
 */
export async function reset(seed = null) {
  records = structuredClone(seed ?? seedData);
}
