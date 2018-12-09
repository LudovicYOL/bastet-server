import User from "../models/User";

module.exports.findById = function(req, res) {
    User
      .findById(req.body.id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
};

module.exports.findAll = function(req, res) {
  User.find((err, issues) => {
      if (err)
          console.log(err);
      else
          res.json(issues);
  });
};
