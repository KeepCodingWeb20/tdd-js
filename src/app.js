import express from 'express';
import ejs     from 'ejs';
import path    from 'node:path';
import { fileURLToPath } from 'node:url';
import router  from './web/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ---------------------------------------------------------------------------
// Motor de plantillas
// ---------------------------------------------------------------------------

// Usamos EJS como motor de plantillas pero con extensión .html,
// de modo que res.render renderice las vistas .html de web/views.
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'web', 'views'));

// ---------------------------------------------------------------------------
// Middlewares globales
// ---------------------------------------------------------------------------
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'web', 'views')));

// ---------------------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------------------
app.use('/', router);

export default app;
