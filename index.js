const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var corOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corOptions));

app.options("*", cors());
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// routers
const router = require("./api/routes/infoRouter.js");
app.use("/api/info", router);

// testing api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// port

const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
