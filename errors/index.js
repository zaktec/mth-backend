// errors/index.js

const { body, validationResult } =require( "express-validator");

exports.handle404s = (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  //console.log(err.code)
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }else {
    next()
  }
};
