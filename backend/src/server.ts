import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import user from './model/user';
import country from './model/country';
import sport from './model/sport';
import competition from './model/competition';
import athlete from './model/athlete';


const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/ba170578_PIA_project");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});

const router = express.Router();

// Login
router.route('/loginToTheSystem').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({"username":username, "password": password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

// Get all countries
router.route('/getAllCountries').get((req, res)=>{
    country.find({}, (err, countries)=>{
        if(err) console.log(err);
        else res.json(countries);
    })
});

// Add new user
router.route('/register').post((req, res)=>{
    let newUser = new user(req.body);

    newUser.save().then(e=>{
        res.status(200).json({'newUser':'ok'});
    }).catch(err=>{
        res.status(400).json({'newUser':'no'});
    })
});

// Find user by username
router.route('/findUsername').post((req, res)=>{
    let username = req.body.username;

    user.findOne({"username":username}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

// Change password
router.route('/changePassword').post((req, res)=>{
    let username = req.body.username;
    let newPassword = req.body.newPassword;

    user.findOne({"username":username}, (err, user)=>{
        if(err) res.json({"changePass": "greska"})
        else {
            user.collection.updateOne({'username':username}, {$set:{'password': newPassword}});
            res.json({"changePass":"ok"});
        }
    })
});

// Add new Sport
router.route('/addSport').post((req, res)=>{
    let newSport = new sport(req.body);

    newSport.save().then(e=>{
        res.status(200).json({'newSport':'ok'});
    }).catch(err=>{
        res.status(400).json({'newSport':'no'});
    })
});

// Find sport without discipline TREBA DODATI ZA OSTALE SLUCAJEVE
router.route('/findSportWithoutDiscipline').post((req, res)=>{
    let s = req.body.sport;
    let type = req.body.type;
    let min = req.body.min;
    let max = req.body.max;

    sport.findOne({"sport":s, "type":type, "min":min, "max":max}, (err, sport)=>{
        if(err) console.log(err);
        else res.json(sport);
    })
    
});

// Get all sports
router.route('/getAllSports').get((req, res)=>{
    sport.find({}, (err, sports)=>{
        if(err) console.log(err);
        else res.json(sports);
    })
});

// OVO PREUREDITI
router.route('/addCompetition').post((req, res)=>{
    let newCompetition = new competition(req.body);

    newCompetition.save().then(e=>{
        res.status(200).json({'newCompetition':'ok'});
    }).catch(err=>{
        res.status(400).json({'newCompetition':'no'});
    })
});

// Find athlete
router.route('/findAthlete').post((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;

    athlete.findOne({"name": name, "surname": surname}, (err, athlete)=>{
        if(err) console.log(err);
        else res.json(athlete);
    })
});

// Add discipline in athlete
router.route('/addDiscipline').post((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;
    let discipline = req.body.discipline;

    athlete.findOne({"name": name, "surname": surname}, (err, a)=>{
        if(err) console.log(err);
        else {
            if(a){
                athlete.updateOne({name: name, surname: surname}, { $push: {disciplines: discipline} }, (e, aa) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({'addDiscipline':'no'});
                    }
                    else {
                        res.status(200).json({'addDiscipline':'ok'});
                    }
                })
            }else{
                res.status(200).json({'addDiscipline':'no'});
            }
        }
    })
});

// Add new athlete
router.route('/addAthlete').post((req, res)=>{
    //let newAthlete = new athlete(req.body);
    let new_athlete = new athlete({
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        country: req.body.country,
        disciplines: [req.body.disciplines]
    });
    console.log(new_athlete);
    new_athlete.save().then(e=>{
        console.log("dodao sam");
        res.status(200).json({'newAthlete':'ok'});
    }).catch(err=>{
        console.log("nisam dodao");
        res.status(400).json({'newAthlete':'no'});
    })
});

// Get all athletes
router.route('/getAllAthletes').get((req, res)=>{
    athlete.find({}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by name
router.route('/getAthleteByName').get((req, res)=>{
    let name = req.body.name;

    athlete.find({"name": name}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by surname
router.route('/getAthleteBySurname').get((req, res)=>{
    let surname = req.body.surname;

    athlete.find({"surname": surname}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by name and surname
router.route('/getAthleteByNameSurname').get((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;

    athlete.find({"name": name, "surname": surname}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by sport
router.route('/getAthleteBySport').get((req, res)=>{
    let sport = req.body.sport;

    athlete.find({"sport": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by name and sport
router.route('/getAthleteByNameSport').get((req, res)=>{
    let name = req.body.name;
    let sport = req.body.sport;

    athlete.find({"name": name, "sport": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by surname and sport
router.route('/getAthleteBySurnameSport').get((req, res)=>{
    let surname = req.body.surname;
    let sport = req.body.sport;

    athlete.find({"surname": surname, "sport": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by all
router.route('/getAthleteByNameSurnameSport').get((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;
    let sport = req.body.sport;

    athlete.find({"name": name, "surname": surname, "sport": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));