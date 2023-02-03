exports.gettutordashboard = (req, res, next) => {
  res.status(200);
  res.send({ msg: "Welcome to the Tutor HomePage" });
};

