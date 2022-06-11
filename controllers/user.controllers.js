const {  selectUsers } =require('../models/user.models.js')

exports.getUsers = ( req, res) => {

selectUsers().then((users) => {
    
    res.status(200).send ({ users});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getUserById = () => {};

exports.postUser = () => {};

exports.removeUserById = () => {};

exports.patchUserById = () => {};