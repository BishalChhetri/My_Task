const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var corsOptions = {
  origin: [
    "https://my-task-git-main-bishalchhetri.vercel.app",
    "http://localhost:3000",
    "https://my-task-bishalkc.onrender.com",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// routers
const router = require(".src/api/routes/infoRouter.js");
const sectorRouter = require(".src/api/routes/sectorRouter.js");
app.use("/api/info", router);
app.use("/api/sector", sectorRouter);

// testing api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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
