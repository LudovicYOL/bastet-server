import Mission from "../models/MissionModel";
import User from "../models/UserModel";
import History from "../models/HistoryModel";

module.exports.findByUser = function (req, res) {
    Mission
        .find({ user: req.params.user })
        .sort({ startYear: -1, startMonth: -1 })
        .exec(function (err, user) {
            res.status(200).json(user);
        });
};

module.exports.addToUser = function (req, res) {
    let mission = new Mission(req.body);
    mission.user = req.params.user;

    mission.save()
        .then(mission => {
            // Create history
            User.findById(mission.user, function (err, user) {
                let history = new History();
                history.createInstance(user, "a ajouté une mission");
            });
            
            // Return mission
            res.status(200).json(mission);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

module.exports.delete = function (req, res) {
    Mission.findByIdAndRemove({ _id: req.params.id }, (err, mission) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
};