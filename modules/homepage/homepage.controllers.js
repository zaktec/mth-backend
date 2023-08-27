

//app.get("/api/homepage", getHomepage)
exports.getHomepage = (req, res, next) => {
  // console.log("Get /api, hellooo");
  res.status(200);
  res.send({ msg: "Welcome to the HomePage" });
};


