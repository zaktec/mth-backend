const {  selectDigitutors } =require('../models/digitutor.models.js')

exports.getDigitutors = ( req, res) => {

selectDigitutors().then((digitutor) => {
    res.status(200).send({ digitutor});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getDigitutorById = () => {};

exports.postDigitutor = () => {};

exports.removeDigitutorById = () => {};

exports.patchDigitutorById = () => {};