const jwt = require("jsonwebtoken");

exports.generateStudentJWT =  async (student_id) => {
    return jwt.sign({ student_id }, process.env.JWT_SECRET );
};

exports.validateStudent = (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: err.toString(),
            message: 'halt intruder! get outta here'
          });
        } else {
          req.student_id = payload;
          next();
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
        message: "Internal Server Error"
      });
    }
}