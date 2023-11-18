const {
  insertAdmin,
  selectAdmin,
  selectAdminById,
  deleteAdminById,
  updateAdminById,
  checkAdminExist,
} = require('./adminModel');
const endpoints = require('../../../../endpoints.json');

exports.getAdmins = async (req, res, next) => {
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
      res.status(400).send({ message: 'Invalid Input' });
      //return Promise.reject({ status: 404, message: 'Not found' });
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

exports.deleteAdminById = async (req, res, next) => {
  try {
    const { admin_id } = req.params;
    const data = await deleteAdminById(admin_id);
    if (data) {
      res.sendStatus(204);
    } else {
      res.status(400).send({ message: 'Invalid Input' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.updateAdminById = async (req, res, next) => {
  try {
    const admin = req.body;
    const { admin_id } = req.params;
    const data = await updateAdminById(admin, admin_id);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(400).send({ message: 'Invalid Input' });
      //return Promise.reject({ status: 404, message: ' not found ' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getEndpoints = (req, res, next) => {
  try {
    res.status(200).send(endpoints);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getadmindashboard = (req, res, next) => {
  res.status(200);
  res.send({ message: 'Welcome To The Admin Dashboard' });
};

exports.getSettingPage = async (req, res, next) => {
  try {
    res.status(200).send({ message: 'Welcome To The Setting Page' });
  } catch (err) {
    next(err);
  }
};

exports.getResit = (req, res, next) => {
  try {
    res.status(200).send({ message: 'Welcome To The Reset Page' });
  } catch (err) {
    next(err);
  }
};
