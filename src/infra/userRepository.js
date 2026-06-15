import * as db from './fakeDb.js';

/**
 * Busca el primer usuario que coincida con todos los campos de `query` (filtro AND).
 *
 * @param {object} query - Campos a comparar (ej. { email: 'a@b.com' }).
 * @returns {Promise<object|null>}
 */
export async function findOne(query) {
  const all = await db.findAll();
  const queryKeys = Object.keys(query);

  return all.find((user) =>
    queryKeys.every((key) => user[key] === query[key])
  ) ?? null;
}

/**
 * Busca un usuario por su id.
 *
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function findById(id) {
  return findOne({ id });
}

/**
 * Crea un nuevo usuario. La fecha de creacion la asigna el repositorio;
 * el id lo asigna fakeDb.
 *
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function create(data) {
  const record = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  return db.insert(record);
}

/**
 * Actualiza el primer usuario que coincide con `query`.
 * Los campos de `changes` se fusionan sobre los existentes.
 *
 * @param {object} query
 * @param {object} changes
 * @returns {Promise<object|null>}
 */
export async function updateOne(query, changes) {
  const user = await findOne(query);

  if (!user) {
    return null;
  }

  return db.updateById(user.id, changes);
}
