const sectorController = require("../controllers/sectorController.js");

const express = require("express");

const sectorRouter = express();

sectorRouter.get("/getAllSector", sectorController.getAllSector);

module.exports = sectorRouter;
