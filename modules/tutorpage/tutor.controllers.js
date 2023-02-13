const {
  selectTutors,
  selectTutorById,
  insertTutor,
  deleteTutorById,
  updateTutorById,
} = require("./tutor.models.js");
const { checkTutorExists } = require("../../utils/utils.js");

exports.getTutors = async (req, res, next) => {
  try {
  const { sort_by } = req.query;

    const tutors = await selectTutors(sort_by);
    res.status(200).send({ tutors });
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
  const tutorExist =  await checkTutorExists(tutor_id)
      if (tutorExist) {
        const data = await selectTutorById(tutor_id)
          res.status(200).send({ data });
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

exports.postTutor = async (req, res, next) => {
  try {
  const tutor = req.body;
  const data = await insertTutor(tutor)
      res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.removeTutorById = async (req, res, next) => {
  try {
  const { tutor_id } = req.params;

 const data =  await deleteTutorById(tutor_id)
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
exports.patchTutorById = async (req, res, next) => {
  try {
  const tutor = req.body;
  const { tutor_id } = req.params;
 
  const data  = await updateTutorById(tutor, tutor_id)
      if (data) {
        res.status(200).send({ data });
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