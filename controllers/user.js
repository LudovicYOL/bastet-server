import User from "../models/User";

module.exports.findById = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};

module.exports.findAll = function(req, res) {
  User.find((err, issues) => {
      if (err)
          console.log(err);
      else
          res.json(issues);
  });
};
