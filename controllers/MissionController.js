import Mission from "../models/MissionModel";

module.exports.findByUser = function (req, res) {
    Mission
        .find({ user: req.params.user })
        .exec(function (err, user) {
            res.status(200).json(user);
        });
};

module.exports.addToUser = function (req, res) {
    let mission = new Mission(req.body);
    mission.user = req.params.user;
    
    mission.save()
        .then(mission => {
            res.status(200).json(mission);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

module.exports.delete = function(req, res) {
    Mission.findByIdAndRemove({_id: req.params.id}, (err, mission) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
};