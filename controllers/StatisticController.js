import User from "../models/UserModel";

module.exports.promotion = function (req, res) {
    User.aggregate(
        [
            { $group: { _id: "$promotion", count: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ],
        function (err, result) {
            if (err) return handleError(err);
            res.status(200).json(result);
        }
    );
};

module.exports.city = function (req, res) {
    let currentYear = new Date().getFullYear();
    User.aggregate(
        [
            { $match: { promotion: { $lte: currentYear } } },
            { $group: { _id: "$city", count: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ],
        function (err, result) {
            if (err) return handleError(err);
            res.status(200).json(result);
        }
    );
};

