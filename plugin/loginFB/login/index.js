const express = require('express');
const passport = require('passport');
const passportfb= require('passport-facebook').Strategy;
const session = require('express-session');
const db = require('./db.js');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
    secret: "theanh"
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res) => res.send('welcome'));
app.get('/login',(req,res) => res.render('login'));
app.get('/auth/fb', passport.authenticate('facebook',{scope:['email']}));
app.get('/auth/fb/cb', passport.authenticate('facebook',{
    failureRedirect: '/',successRedirect: '/'
}));
app.listen(3000, () => console.log(`working`));


passport.use(new passportfb(
    {
        clientID: "2599119553435508",
        clientSecret : "9458f3d0f53b18cf285f8887eb523f73",
        callbackURL: "http://localhost:3000/auth/fb/cb",
        profileFields:['email', 'gender','locale','displayName']
    },
    (accsessToken, refreshToken, profile, done)=>{
        console.log(profile);
        db.findOne({id:profile._json.id}, (err, user)=> {
            if (err) return done(err)
            if (user) return done(null, user)
            const newUser = new db({
                id: profile._json.id,
                name: profile._json.name,
                email: profile._json.email
            })
            newUser.save((err) =>{
                return done(null, newUser)
            })
        })
    }
    ))  

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) =>
    {
        db.findOne({id}, (err, user) =>{
            done(null, user)
        })
    })