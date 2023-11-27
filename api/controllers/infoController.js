const db = require("../models");
const Info = db.infos;

// Create Info
const addInformation = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      sectors: req.body.sectors,
      agreement: req.body.agreement,
    };
    const infos = await Info.create(info);
    res.json({ infos });
  } catch (e) {
    console.log(e.message);
  }
};

// Get All Info
const getAllInfo = async (req, res) => {
  let infos = await Info.findAll({});
  res.status(200).send(infos);
};

// Get One Info
const getOneInfo = async (req, res) => {
  let id = req.params.id;
  let info = await Info.findOne({ where: { id: id } });
  res.status(200).send(info);
};

// Update  Info
const updateInfo = async (req, res) => {
  let id = req.params.id;

  const info = await Info.update(req.body, { where: { id: id } });
  res.status(200).send(info);
};

// Delete  Info
const deleteInfo = async (req, res) => {
  let id = req.params.id;

  await Info.destroy({ where: { id: id } });
  res.status(200).send("Info Is deleted!");
};

module.exports = {
  addInformation,
  getAllInfo,
  getOneInfo,
  updateInfo,
  deleteInfo,
};
