import History from "../models/HistoryModel";

module.exports.paginate = function (req, res) {
    History.paginate({}, {
        page: req.params.page,
        sort:     { date: -1 },
        populate: 'user',
        limit:    10
    }, 
    function (err, result) {
        res.status(200).json(result);
    });
};
