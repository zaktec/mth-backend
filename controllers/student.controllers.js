const {  selectStudents } =require('../models/student.models.js')

exports.getStudents = async(req,res, next) => {
  const { sort_by } = req.query;
    try {
      const students = await selectStudents(sort_by);
      res.status(200).send ({ students});
    } catch (err){
      next(err)
    }
};

exports.getUserById = () => {};

exports.postUser = () => {};

exports.removeUserById = () => {};

exports.patchUserById = () => {};