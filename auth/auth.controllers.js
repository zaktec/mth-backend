const { checkUser } = require("./auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};
exports.hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

exports.createJWT = (student) => {
  const token = jwt.sign(
    {
      user_id: student.id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

exports.protect = (req, res) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorisesd" });
    return;
  }

  const [, token] = bearer.split("");
  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
  try {
    const auth = jwt.verify(token, process.env.JWT_SECRET);
    console.log(auth);
    req.auth = auth;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  checkUser(username, password).then((student) => {
    console.log(student);
    if (!student || password !== student.student_password) {
      next({ status: 401, msg: "invalid username or password" });
    } else {
      const token = jwt.sign(
        {
          student_id: student.student_id,
          username: student.student_username,
          iat: Date.now(),
        },
        process.env.JWT_SECRET
      );
      res.send({ token });
    }
  });
};

exports.validateStudent = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    console.log(err, payload);
    if (err) {
      next({ status: 401, msg: "halt intruder! get outta here" });
    } else {
      req.student = payload
      //null { student_id: 1, username: 'stundentusername1', iat: 1672860018550 }
      //const {student_id } =req.student
      next();
    }
  });
};

exports.createNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  createUser(username, password)
    .then(() => {
      res.status(200).send({ msg: "created new user" });
    })
    .catch((err) => {
      next(err);
    });
};
