const express = require('express');
const http = require('http');
const cors = require('cors');
const engines = require('consolidate');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const server = http.Server(app)

app.use(cors());
app.use(express.json());

app.engine("ejs", engines.ejs);
// app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");

app.use('/api', routes);

app.use(function (req, res, next) {
  res.status(404).json({
    erro: "Not Found",
    method: req.method,
    originalUrl: req.originalUrl
  });
});

server.listen(process.env.PORT || 3333);