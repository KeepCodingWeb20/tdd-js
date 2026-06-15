/**
 * Punto de entrada del servidor.
 *
 * Solo hace una cosa: importar la app configurada y ponerla a escuchar.
 * Mantener este archivo mínimo nos permite que `app.js` sea reutilizable
 * en tests sin abrir ningún puerto.
 */

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
  console.log(`Presiona Ctrl+C para detenerlo`);
});
