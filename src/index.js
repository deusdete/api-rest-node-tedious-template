const express = require("express");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require("http");
const cors = require("cors");
const engines = require("consolidate");
const rateLimit = require('express-rate-limit');
const morgan = require('morgan')
const xss = require('xss-clean')
const helmet = require('helmet');
require("dotenv").config();

const routes = require("./routes");
const logger = require("./log/logger");

const limit = rateLimit({
  max: 900000, // max requisições
  windowMs: 60 * 60 * 1000, //
  message: {
    message:
      "Muitas requisições a partir deste IP, tente novamente após um hora",
  }, // message to send
});

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`);

  // Fork workers.
  logger.info(`Clusterting to ${numCPUs} CPUs`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`worker ${worker.process.pid} died`);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.info("Worker crashed. Starting a one new");
      cluster.fork();
    }
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log("worker success!");
    }
  });
} else {
  const app = express();
  const server = http.Server(app);

  app.use(cors());
  app.use(helmet());

  app.engine("ejs", engines.ejs);
  // app.set('views', path.join(__dirname, './src/views'));
  app.set("view engine", "ejs");

  app.use(express.json({limit: '25mb'}));
  app.use(express.urlencoded({limit: '25mb'}))

  app.use(morgan('tiny'));

  app.use(xss())
  app.use("/api", limit, routes);

  app.use(function (req, res, next) {
    res.status(404).json({
      erro: "Not Found",
      method: req.method,
      originalUrl: req.originalUrl,
    });
  });

  server.listen(process.env.PORT || 3333);
}
