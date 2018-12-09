import passport from 'passport';
import User from '../models/User';

module.exports.register = function (req, res) {

    if (req.body.email &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.promotion &&
        req.body.password) {

        User.findOne({
                email: req.body.email
            }, function (err, result) {
                if (!result) {
                    var user = new User();

                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    user.promotion = req.body.promotion;

                    user.setPassword(req.body.password);

                    user.save(function (err) {
                        var token;
                        token = user.generateJwt();
                        res.status(200);
                        res.json({
                            "token": token
                        });
                    });
                } else {
                    res.status(409);
                    res.json({"error":"User with mail already exists"});
                }
            }
        );
    } else {
        res.status(400);
        res.json({"error":"Unvalid data to register"});
    }
};

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
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