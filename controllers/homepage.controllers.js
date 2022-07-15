const endpoints = require("../endpoints.json");

//app.get("/api/homepage", getHomepage)
exports.getHomepage = (req, res, next) => {
  console.log("Get /api, hellooo");
  res.status(200);
  res.send({ msg: "Welcome to the HomePage" });
};

//app.get('/api/', getEndpoints)
exports.getEndpoints = (req, res, next) => {
  res.status(200).send(endpoints);
};
