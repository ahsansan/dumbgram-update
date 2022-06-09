// env
require("dotenv").config();

const express = require("express");
const router = require("./src/routers");
const cors = require("cors");

const app = express();

// port
const port = process.env.PORT || 5000;

// Socket IO
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://fe-dumbgram.netlify.app/",
  },
});

require("./src/socket")(io);

// JSON
app.use(express.json());

// CORS
app.use(cors());

// URL API
app.use("/api/dumbgram/v1/", router);

// Home
app.get("/", function (req, res) {
  res.send({
    message: "Hello World",
  });
});

// ImageFile
app.use("/uploads", express.static("uploads"));

// Server listen
server.listen(port, () => console.log(`Server running on port ${port}`));
