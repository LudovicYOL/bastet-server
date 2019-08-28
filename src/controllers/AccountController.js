import Account from "../models/AccountModel";

module.exports.updateLogin = function (req, res) {
    Account.findOne({ _id: req.body.id }, function (err, account) {
        // Password verification
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
    Account.findOne({ _id: req.body.id }, function (err, account) {
         // Password verification
        if (!account.validPassword(req.body.actualPassword)) {
            res.status(400).json({"error":"Wrong password"});
        } else { 
             // If ok, update password
            account.setPassword(req.body.newPassword);
            account.save(function(err, response) {
                res.status(200).json(response);
            });
        }
    });
};



