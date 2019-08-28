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

module.exports.delete = function(req, res) {
    History.deleteOne({_id: req.params.id}, function(err, result){
        if(!err){
            res.status(200).json(result);
        }
    });
};
