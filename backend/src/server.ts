import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import user from './model/user';
import country from './model/country';

const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/ba170578_PIA_project");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});

const router = express.Router();

router.route('/loginToTheSystem').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({"username":username, "password": password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/getAllCountries').get((req, res)=>{
    country.find({}, (err, countries)=>{
        if(err) console.log(err);
        else res.json(countries);
    })
});

router.route('/register').get((req, res)=>{
    let newUser = new user(req.body);

    newUser.save().then(e=>{
        res.status(200).json({'newUser':'ok'});
    }).catch(err=>{
        res.status(400).json({'newUser':'no'});
    })
});

router.route('/findUsername').post((req, res)=>{
    let username = req.body.username;

    user.findOne({"username":username}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));