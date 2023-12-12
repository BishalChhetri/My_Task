const infoController = require("../controllers/infoController.js");
const sectorController = require("../controllers/sectorController.js");

const express = require("express");

const router = express();

router.post("/addInformation", infoController.addInformation);
router.get("/getAllInfo", infoController.getAllInfo);
router.get("/:id", infoController.getOneInfo);
router.put("/:id", infoController.updateInfo);
router.delete("/:id", infoController.deleteInfo);
router.get("/getAllSector", sectorController.getAllSector);

module.exports = router;
