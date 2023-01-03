const { checkUser } = require("./auth.models");

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  checkUser(username, password)
    .then(() => {
      res.status(200).send({ msg: "logged in user" });
    })
    .catch((err) => {
      next(err);
    });
};
