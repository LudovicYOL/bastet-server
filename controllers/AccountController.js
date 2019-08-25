import Account from "../models/AccountModel";

module.exports.updateLogin = function (req, res) {
    // Password verification
    Account.findOne({ _id: req.body.id }, function (err, account) {
        if (!account.validPassword(req.body.password)) {
            res.status(400).json({"error":"Wrong password"});
        } else { 
            // If ok, update login
            Account.update({ _id: req.body.id }, {
                email: req.body.email
            }, function (err, number, response) {
                res.status(200).json(response);
            })
        }
    });
};

module.exports.updatePassword = function (req, res) {
    let account = Account.findById(req.body._id);
    account.setPassword(req.body.password);
    account.save()
        .then(mission => {
            res.status(200).json(mission);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};



