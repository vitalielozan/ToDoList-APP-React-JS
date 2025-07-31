import './env.js';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(express.json());

app.use(rateLimiter);

app.use('/api/tasks', tasksRoutes);

// Frontend serving
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../client/dist');
  const indexFile = path.join(__dirname, '../../client', 'dist', 'index.html');

  if (fs.existsSync(indexFile)) {
    app.use(express.static(distPath));
    app.get('/{*splat}', (req, res) => {
      res.sendFile(indexFile);
    });
  } else {
    console.error('index.html not exist in client/dist');
  }
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
