import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'express-jwt';

import Issue from './models/Issue';

import CtrlAuthentication from './controllers/authentication';
import CtrlProfile from './controllers/profile';
import CtrlIssue from './controllers/issue';

require('./config/passport');

const app = express();
const router = express.Router();

var auth = jwt({
    secret: 'MY_SECRET', // TODO : mettre Secret dans un fichier de config, non committé
    userProperty: 'payload'
  });

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });

mongoose.connect("mongodb://localhost:27017/bastet", { useNewUrlParser: true }); // TODO mettre dans une variable de configuration

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// AUTHENTICATION
router.post('/register', CtrlAuthentication.register);
router.post('/login', CtrlAuthentication.login);

// PROFILE
router.get('/profile', auth, CtrlProfile.profileRead);

// ISSUES
router.get('/issues', auth, CtrlIssue.find);
router.get('/issues/:id', auth, CtrlIssue.findById);
router.post('/issues/add', auth, CtrlIssue.add);
router.post('/issues/update/:id', auth, CtrlIssue.update);
router.get('/issues/delete/:id', auth, CtrlIssue.delete);



app.use('/api', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));