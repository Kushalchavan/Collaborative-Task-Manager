import dotenv from "dotenv";
import http from 'http';
import app from "./app";
import { initSocket } from "./config/socket";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// socket initialization
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
