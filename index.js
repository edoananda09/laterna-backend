require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const rootRouter = require("./src/routes/index");
const cors = require("cors");

const { PORT } = process.env;

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

server.listen(PORT || 8000, () => {
  console.log(`Backend running on port ${PORT || 8000}`);
});

app.use("/", rootRouter);
