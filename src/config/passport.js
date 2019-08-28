import passport from 'passport';
import Account from '../models/AccountModel';

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    Account.findOne({ email: username }, function (err, account) {
      if (err) { return done(err); }
      // Return if account not found in database
      if (!account) {
        return done(null, false, {
          message: 'Account not found'
        });
      }
      // Return if password is wrong
      if (!account.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, account);
    });
  }
));