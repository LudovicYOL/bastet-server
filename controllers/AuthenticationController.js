import passport from 'passport';
import User from '../models/UserModel';
import Account from '../models/AccountModel';
import History from '../models/HistoryModel';

module.exports.register = function (req, res) {

    if (req.body.email &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.promotion &&
        req.body.password) {

        Account.findOne({
            email: req.body.email
        }, function (err, result) {
            if (!result) {

                // Create account
                var account = Account();
                account.email = req.body.email;
                account.setPassword(req.body.password);

                // Create user
                var user = new User();
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.promotion = req.body.promotion;

                // Save user
                user.save(function (err, savedUser) {
                    // Save account
                    account.user = savedUser.id;
                    account.save(function (err) {

                        // Create history
                        User.findById(account.user, function (err, user) {
                            let history = new History();
                            history.createInstance(user, "a créé son compte sur Bastet !");
                        });

                        // Return with token
                        var token;
                        token = account.generateJwt();
                        res.status(200);
                        res.json({
                            "token": token
                        });
                    });
                });

            } else {
                res.status(409);
                res.json({ "error": "User with mail already exists" });
            }
        }
        );
    } else {
        res.status(400);
        res.json({ "error": "Unvalid data to register" });
    }
};

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, account, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (account) {

            // Create history
            User.findById(account.user, function (err, user) {
                let history = new History();
                history.createInstance(user, "s'est connecté à Bastet !");
            });

            // Return token
            token = account.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};