import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const frontendDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');
const frontendIndex = path.join(frontendDist, 'index.html');

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '50kb' }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/healthz', (_req, res) => res.json({ name: 'Arusuvai Foods API', status: 'ok' }));
app.use('/api', routes);

app.use('/api', notFound);
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (!existsSync(frontendIndex)) {
    if (req.path === '/') return res.json({ name: 'Arusuvai Foods API', status: 'ok' });
    return notFound(req, res);
  }

  res.sendFile(frontendIndex, (err) => {
    if (err) next(err);
  });
});
app.use(notFound);
app.use(errorHandler);

export default app;
