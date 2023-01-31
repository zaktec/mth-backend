const { checkAdminExist } = require("../../utils/utils");
const { selectCourseById } = require("../coursepage/course.models");
const {
  selectAdmin,
  selectAdminById,
  insertAdmin,
  deleteAdminById,
  updateAdminById,
} = require("./admin.model");

exports.getAdmin = (req, res, next) => {
  try {
    const { sort_by } = req.query;
    selectAdmin(sort_by).then((admin) => {
      res.status(200).send({ admin });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getAdminById = (req, res, next) => {
  try {
    const { admins_id } = req.params;
    return checkAdminExist(admins_id).then((adminExist) => {
      if (adminExist) {
        return selectAdminById(admins_id).then((admin) => {
          res.status(200).send({ admin });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.postAdmin = (req, res, next) => {
  try {
    const admin = req.body;
    insertAdmin(admin).then((admin) => {
      res.status(201).send({ admin });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.removeAdminById = (req, res, next) => {
  try {
    const { admins_id } = req.params;
    deleteAdminById(admins_id).then((deletedAdmin) => {
      if (deletedAdmin) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: " Not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.patchAdminById = (req, res, next) => {
    try{
    const admin = req.body;
    const { admins_id} = req.params;
    return updateAdminById (admin, admins_id)
    .then((updatedAdmin) => {
        if (updatedAdmin){
                res.status(200).send ({ updateAdmin})
        } else{
            return Promise.reject({ status: 404, msg: " not found "})
    }})
    }catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.toString(),
        });
      }
    };
