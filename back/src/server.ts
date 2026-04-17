import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/indexRouter";
import credentialRouter from "./routes/credentialsRouter";

const server = express();

const corsOptions = {
  origin: process.env.FRONT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

server.use(cors(corsOptions));

server.use(morgan("dev"));
server.use(express.json());

server.use(router);
server.use("/credentials", credentialRouter);

export default server;
