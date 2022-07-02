const endpoints = require("../endpoints.json");


exports.getHomepage =  (req, res, next)=>{
    console.log("Get /api, hellooo")
    res.status(200);
    res.send({ msg: "Welcome to the HomePage"})
}

    exports.getEndpoints = (req, res, next) => {
        res.status(200).send(endpoints);
      }

