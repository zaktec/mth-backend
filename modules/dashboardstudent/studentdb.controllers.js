exports.getstudentdashboard = (req, res, next) => {
  console.log('I am student, this is my student_id =>', req.student_id);
  res.status(200);
  res.send({ msg: "Welcome to the Student Dashboard" });
};

exports.getStudentById = async (req, res, next) => {
  try {
  const { student_id } = req;
  const studentExist = await  checkStudentExists(student_id)
      if (studentExist) {
        const data = await selectStudentById(student_id)
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