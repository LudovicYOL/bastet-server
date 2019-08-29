import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'express-jwt';

import CtrlAuthentication from './controllers/AuthenticationController';
import CtrlAccount from './controllers/AccountController';
import CtrlUser from './controllers/UserController';
import CtrlMission from './controllers/MissionController';
import CtrlStat from './controllers/StatisticController';
import CtrlHistory from './controllers/HistoryController';

require('./config/passport');
const config = require('./config/config.js');

// Création de l'application
const app = express();
const router = express.Router();

// Configuration globale
app.use(cors());
app.use(bodyParser.json());

// Configuration JWT with passport
app.use(passport.initialize());
var auth = jwt({
  secret: config.SECRET_JWT, 
  userProperty: 'payload'
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });

// Mongo connection
mongoose.connect(config.MONGO_URL + config.MONGO_DATABASE, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// API definition
// Authentication
router.post('/register', CtrlAuthentication.register);
router.post('/login', CtrlAuthentication.login);

// Account 
router.post('/update-password', auth, CtrlAccount.updatePassword);
router.post('/update-login', auth, CtrlAccount.updateLogin);

// Profile
router.get('/user/:id', auth, CtrlUser.findById);
router.get('/user/search/:keywords', auth, CtrlUser.search);
router.get('/users', auth, CtrlUser.findAll);
router.post('/user/update', auth, CtrlUser.update);

// Mission
router.get('/mission/:user', auth, CtrlMission.findByUser);
router.post('/mission/:user', auth, CtrlMission.addToUser);
router.delete('/mission/:id', auth, CtrlMission.delete);

// History 
router.get('/history/:page', auth, CtrlHistory.paginate);
router.delete('/history/:id', auth, CtrlHistory.delete);

// Statistic
router.get('/stat/promotion', auth, CtrlStat.promotion);
router.get('/stat/city', auth, CtrlStat.city);

// server startup
app.use('/api', router);
app.listen(config.PORT, () => console.log(`Express server running on port ` + config.PORT));
