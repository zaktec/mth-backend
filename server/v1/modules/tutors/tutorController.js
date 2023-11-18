const {
  insertTutor,
  selectTutors,
  selectTutorById,
  deleteTutorById,
  updateTutorById,
  checkTutorExists,
} = require('./tutorModel.js');

exports.getTutorDashboard = (req, res, next) => {
  res.status(200).send({ message: `Welcome to the Student Dashboard, ${req.tutor_id}` });
};

exports.getTutors = async (req, res, next) => {
  try {
    const { sort_by } = req.query;

    const data = await selectTutors(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getTutorById = async (req, res, next) => {
  try {
    const { tutor_id } = req.params;
    const tutorExist = await checkTutorExists(tutor_id);
    if (tutorExist) {
      const data = await selectTutorById(tutor_id);
      res.status(200).send({ data });
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

exports.postTutor = async (req, res, next) => {
  try {
    const tutor = req.body;
    const data = await insertTutor(tutor);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.deleteTutorById = async (req, res, next) => {
  try {
    const { tutor_id } = req.params;

    const data = await deleteTutorById(tutor_id);
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

exports.updateTutorById = async (req, res, next) => {
  try {
    const tutor = req.body;
    const { tutor_id } = req.params;

    const data = await updateTutorById(tutor, tutor_id);
    if (data) {
      res.status(200).send({ data });
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
