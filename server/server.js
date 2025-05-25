const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('tasks.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use(router);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Json Server is running on port ${PORT}`);
});
