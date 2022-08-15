const { selectResit } = require("../models/setting.model");
//const runSeed = require("../database/seeds/run-seed.js")
//const seed = require("../database/seeds/seed");
//const devData = require("../database/data/dev-data");
     exports.getSettingPage = async (req, res, next) => {
    
        try {
          res.status(200).send({ msg: "Welcome to the SettingPage" });
        } catch (err) {
          next(err);
        }
      };
      
   //app.get('/api/', getEndpoints)
   exports.getResit = (req, res, next) => {
    // res.status(200);
    // res.send({ msg: "Welcome to the ResitPage" });
    try {
       // selectResit()
      //runSeed
        res.status(200).send({ msg: "Welcome to the ResitPage" });
      } catch (err) {
        next(err);
      }
    };
    
 

 