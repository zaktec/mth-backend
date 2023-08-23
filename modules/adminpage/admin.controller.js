const { checkAdminExist } = require("../../utils/utils");
const {
  selectAdmin,
  selectAdminById,
  insertAdmin,
  deleteAdminById,
  updateAdminById,
} = require("./admin.model");

exports.getAdmin = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectAdmin(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const { admin_id } = req.params;
    const adminExist = await checkAdminExist(admin_id);
    if (adminExist) {
      const data = await selectAdminById(admin_id);
      res.status(200).send({ data });
    } else {
      res.status(400).send({ msg: "Invalid Input" });
      //return Promise.reject({ status: 404, msg: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.postAdmin = async (req, res, next) => {
  try {
    const admin = req.body;
    const data = await insertAdmin(admin);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.removeAdminById = async (req, res, next) => {
  try {
    const { admin_id } = req.params;
    const data = await deleteAdminById(admin_id);
    if (data) {
      res.sendStatus(204);
    } else {
      res.status(400).send({ msg: "Invalid Input" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.patchAdminById = async (req, res, next) => {
  try {
    const admin = req.body;
    const { admin_id } = req.params;
    const data = await updateAdminById(admin, admin_id);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(400).send({ msg: "Invalid Input" });
      //return Promise.reject({ status: 404, msg: " not found " });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
