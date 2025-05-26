const jsonServer = require('json-server');
const rateLimit = require('express-rate-limit');

const server = jsonServer.create();
const router = jsonServer.router('tasks.json');
const middlewares = jsonServer.defaults();

const allowedOrigin = 'http://localhost:3001';
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'To many time, try again in one minute.',
});
server.use(limiter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/tasks', (req, res, next) => {
  const { taskName } = req.body;
  if (!taskName || typeof taskName !== 'string' || taskName.length > 50) {
    return res.status(400).json({ error: 'Task name is not valid.' });
  }
  next();
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Json Server is running on port ${PORT}`);
});
