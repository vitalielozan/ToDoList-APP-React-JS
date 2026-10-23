👋 Hi, I’m @vitalielozan

👀 I’m interested in Frontend Web developer

🌱 I’m currently learning HTML&CSS, JavaScript, React

# ToDoList-App

A simple To-Do List application built with ReactJS. It allows users to add, complete, and delete tasks.

## Technologies Used

- ReactJS (created with `vite-react`)
- HTML5 & CSS3
- JavaScript (ES6+)
- React JS
- Express JS
- MongoDB

## Features

- Add tasks
- Delete tasks
- Mark tasks as completed
- Store tasks using an external server
- Responsive interface

## Deploy on Render

Create a **Web Service** from the repository and use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | Leave empty (repository root) |
| Build Command | `npm run build` |
| Start Command | `npm start` |
| Environment variable | `MONGO_URL` = your MongoDB connection string |

The `.node-version` file selects Node.js 24.21.0, which supports the current Vite and Mongoose versions. If `NODE_VERSION` is already set in Render, it takes precedence; update it to a compatible version or remove it. Render sets `NODE_ENV=production` for Node web services and supplies `PORT` automatically, so neither needs to be configured manually. The local `server/.env` file is ignored by Git and is **not** available on Render. Set `MONGO_URL` in the service's **Environment** page, then redeploy.

If MongoDB Atlas is used, allow the Render service's outbound IP ranges in Atlas **Network Access**. Check the Render service logs after redeploying: the server should log `MongoDB connected successfully` and `Server is running on PORT: ...`. If it still fails, the first MongoDB connection error in those logs identifies the next issue.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.
