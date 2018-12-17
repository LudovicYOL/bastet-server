import User from "../models/UserModel";

module.exports.findById = function (req, res) {
  User
    .findById(req.params.id)
    .exec(function (err, user) {
      res.status(200).json(user);
    });
};

module.exports.update = function (req, res) {
  console.log(req.body);
  User
    .findByIdAndUpdate(
      req.body._id,
      req.body, {
        new: true
      },
      (err, user) => {
        if (err)
          console.log(err);
        res.status(200).json(user);
      });
};

module.exports.findAll = function (req, res) {
  User.find((err, issues) => {
    if (err)
      console.log(err);
    else
      res.json(issues);
  });
};