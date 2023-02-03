exports.getadmindashboard = (req, res, next) => {
  res.status(200);
  res.send({ msg: "Welcome to the Admin HomePage" });
};

