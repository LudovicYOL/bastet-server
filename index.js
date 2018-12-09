import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'express-jwt';

import CtrlAuthentication from './controllers/authentication';
import CtrlUser from './controllers/user';
import CtrlIssue from './controllers/issue';

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

// Connexion à Mongo
mongoose.connect(config.MONGO_URL + config.MONGO_DATABASE, { useNewUrlParser: true }); // TODO mettre dans une variable de configuration
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// Définition des routes
// AUTHENTICATION
router.post('/register', CtrlAuthentication.register);
router.post('/login', CtrlAuthentication.login);

// PROFILE
router.get('/user/:id', auth, CtrlUser.findById);
router.get('/users', auth, CtrlUser.findAll);
router.post('/user/update', auth, CtrlUser.update);

// ISSUES
router.get('/issues', auth, CtrlIssue.find);
router.get('/issues/:id', auth, CtrlIssue.findById);
router.post('/issues/add', auth, CtrlIssue.add);
router.post('/issues/update/:id', auth, CtrlIssue.update);
router.get('/issues/delete/:id', auth, CtrlIssue.delete);

// Lancement du serveur
app.use('/api', router);
app.listen(config.PORT, () => console.log(`Express server running on port ` + config.PORT));