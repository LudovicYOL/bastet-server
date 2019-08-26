import User from "../models/UserModel";
import History from "../models/HistoryModel";

module.exports.findById = function (req, res) {
  User
    .findById(req.params.id)
    .exec(function (err, user) {
      res.status(200).json(user);
    });
};

module.exports.update = function (req, res) {
  User
    .findByIdAndUpdate(
      req.body._id,
      req.body, {
        new: true
      },
      (err, user) => {
        if (err)
          console.log(err);

        // Create history 
        let history = new History();
        history.createInstance(user, "a modifié son profil");

        // Return user after update 
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