const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } else {
        req.admins_id = payload;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};

exports.verifyStudent = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } 
      console.log(typeof payload.student_id, "khjdjhdjh")
      if (payload.admins_id)
    {return res.status(401).json({
        status: 401,
        error: err.toString(),
        message: "Not student token",
      });}
      
      else {
        
        req.student_id = payload;
        console.log(payload, "<<<<<<<<<");
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};

exports.verifyTutor = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } else {
        req.tutor_id = payload;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};
