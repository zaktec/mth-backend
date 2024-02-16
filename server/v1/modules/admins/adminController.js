/**
 * This adminController contains 10 functions required to handle
 * getAdmins
 * getAdminById
 * postAdmin
 * deleteAdminById
 * updateAdminById
 * getEndpoints
 * getadmindashboard
 * getSettingPage
 * getResit
 */

const {
  insertAdmin,
  selectAdmin,
  selectAdminById,
  deleteAdminById,
  updateAdminById,
  checkAdminExist,
} = require('./adminModel');
const endpoints = require('../../../../endpoints.json');

/**
 * Get list of admin users
 * @param {string} req sort_by request
 * @param {object} res data response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * 
 */
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

/**
 * serves an admin object when an id is given
 * @param {int} req admin_id request
 * @param {object} res data response -admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 */

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

/**
 * Register new Admin User
 * @param {object} req body request
 * @param {object} res admin response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * @returns {object} response.
 */
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

/**
 * Delete the Admin with id given
 * @param {int} req admin_id request
 * @param {object} res message response 
 * 
 */

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

/**
 * Update the Admin User with id given
 * @param {int} req admin_id request
 * @param {object} res admin response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * 
 */

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
/**
 * serves a json file of endpoint
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */
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

/**
 * serves a message for admin dashboard
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */
exports.getadmindashboard = (req, res, next) => {
  res.status(200);
  res.send({ message: 'Welcome To The Admin Dashboards' });
};

/**
 * serves a message for the setting page 
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */
exports.getSettingPage = async (req, res, next) => {
  try {
    res.status(200).send({ message: 'Welcome To The Setting Page' });
  } catch (err) {
    next(err);
  }
};

/**
 * serves a message for the reset  page 
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */
exports.getResit = (req, res, next) => {
  try {
    res.status(200).send({ message: 'Welcome To The Reset Page' });
  } catch (err) {
    next(err);
  }
};
