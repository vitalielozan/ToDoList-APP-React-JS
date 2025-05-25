const jsonServer = require('json-server');
const rateLimit = require('express-rate-limit');

const server = jsonServer.create();
const router = jsonServer.router('tasks.json');
const middlewares = jsonServer.defaults();

const allowedOrigin = 'https://todolist-app-react-js.onrender.com';
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'To many time, try again i 1 minute.',
});
server.use(limiter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/tasks', (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || title.length > 100) {
    return res.status(400).json({ error: 'Title is not valid.' });
  }
  next();
});

server.use(router);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Json Server is running on port ${PORT}`);
});
