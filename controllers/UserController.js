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

module.exports.search = function (req, res) {
  let keywords = req.params.keywords;
  User.find({ 
    $or: [
      { firstName: new RegExp('.*' + keywords + '.*', 'i') }, 
      { lastName: new RegExp('.*' + keywords + '.*', 'i') }, 
      { promotion: new RegExp('.*' + keywords + '.*', 'i') },
      { city: new RegExp('.*' + keywords + '.*', 'i') },
      // { description: new RegExp('.*' + keywords + '.*', 'i') },
      { keywords: new RegExp('.*' + keywords + '.*', 'i') },
    ]},
  function (err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(user);
    res.json(user);
  });
};