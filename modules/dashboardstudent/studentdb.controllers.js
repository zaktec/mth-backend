exports.getstudentdashboard = (req, res, next) => {
  console.log('I am student, this is my student_id =>', req.student_id);
  res.status(200);
  res.send({ msg: "Welcome to the Student Dashboard" });
};

