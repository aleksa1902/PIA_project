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
    console.log(newCompetition);

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
    let new_athlete = new athlete({
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        country: req.body.country,
        disciplines: [req.body.disciplines]
    });
    let coun = req.body.country;
    //console.log(new_athlete);

    new_athlete.save().then(e=>{
        console.log("dodao sam");
        country.updateOne({name: coun}, {$inc: {'numberOfAthletes': 1}}, (e, r) => {
            console.log(r);
            if(e){
                res.status(400).json({'newAthlete':'no'});
            }else{
                res.status(200).json({'newAthlete':'ok'});
            }    
        })
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
router.route('/getAthleteByName').post((req, res)=>{
    let name = req.body.name;

    athlete.find({"name": name}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by surname
router.route('/getAthleteBySurname').post((req, res)=>{
    let surname = req.body.surname;

    athlete.find({"surname": surname}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by name and surname
router.route('/getAthleteByNameSurname').post((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;

    athlete.find({"name": name, "surname": surname}, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by sport
router.route('/getAthleteBySport').post((req, res)=>{
    let sport = req.body.sport;

    athlete.find({"disciplines": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by name and sport
router.route('/getAthleteByNameSport').post((req, res)=>{
    let name = req.body.name;
    let sport = req.body.sport;

    athlete.find({"name": name, "disciplines": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by surname and sport
router.route('/getAthleteBySurnameSport').post((req, res)=>{
    let surname = req.body.surname;
    let sport = req.body.sport;

    athlete.find({"surname": surname, "disciplines": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all athletes by all
router.route('/getAthleteByNameSurnameSport').post((req, res)=>{
    let name = req.body.name;
    let surname = req.body.surname;
    let sport = req.body.sport;

    athlete.find({"name": name, "surname": surname, "disciplines": sport }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get all delegates
router.route('/getAllDelegates').get((req, res)=>{
    user.find({"userType": "competitionDelegate"}, (err, delegates)=>{
        if(err) console.log(err);
        else res.json(delegates);
    })
});

// Get individual sport
router.route('/getIndividualSport').get((req, res)=>{
    sport.find({"type": "individual"}, (err, delegates)=>{
        if(err) console.log(err);
        else res.json(delegates);
    })
});

// Get all athletes sport and gender
router.route('/getAthleteBySportGender').post((req, res)=>{
    let gender = req.body.gender;
    let sport = req.body.sport;

    athlete.find({"disciplines": sport, "gender": gender }, (err, athletes)=>{
        if(err) console.log(err);
        else res.json(athletes);
    })
});

// Get tennis
router.route('/getTennis').get((req, res)=>{
    sport.find({"discipline": "Singles"}, (err, sports)=>{
        if(err) console.log(err);
        else res.json(sports);
    })
});

// Check delegate
router.route('/checkDelegate').post((req, res)=>{
    let username = req.body.username;

    competition.find({"delegate": username}, (err, comp)=>{
        if(err) console.log(err);
        else res.json(comp);
    })
});

// Get competition
router.route('/getCompetition').post((req, res)=>{
    let name = req.body.name;

    competition.findOne({"competition": name}, (err, comp)=>{
        if(err) console.log(err);
        else res.json(comp);
    })
});

// Add discipline in athlete
router.route('/updateCompetition').post((req, res)=>{
    let name = req.body.name;
    let location = req.body.location;
    let date = new Date(req.body.date);
    
    console.log("ovo sam dobio od fronta i kreirao sam new Date " + date);

    competition.findOne({"competition": name}, (err, a)=>{
        if(err) console.log(err);
        else {
            if(a){
                console.log("tu");
                console.log(date.toString());
                competition.updateOne({competition: name}, { $set: {location: location, date: date} }, (e, aa) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({'updatedComp':'no'});
                    }
                    else {
                        res.status(200).json({'updatedComp':'ok'});
                    }
                })
            }else{
                res.status(200).json({'updatedComp':'no'});
            }
        }
    })
});

// Competition start
router.route('/competitionStart').post((req, res)=>{
    let sport = req.body.sport;
    let discipline = req.body.discipline;

    competition.findOne({"sport":sport, "discipline":discipline}, (err, comp)=>{
        if(err) console.log(err);
        else res.json(comp);
    })
});

// Add discipline in athlete
router.route('/updateResults').post((req, res)=>{
    let name = req.body.name;
    let goldC = req.body.gc;
    let silverC = req.body.sc;
    let bronzeC = req.body.bc;

    country.updateOne({name: goldC}, {$inc: {'goldMedals': 1}}, (e, a)=>{
        if (e) {
            console.log(e);
            res.status(400).json({'medal':'no'});
        }
        else {
            country.updateOne({name: silverC}, {$inc: {'silverMedals': 1}}, (e, a)=>{
                if (e) {
                    console.log(e);
                    res.status(400).json({'medal':'no'});
                }
                else {
                    console.log(bronzeC);
                    country.updateOne({name: bronzeC}, {$inc: {'bronzeMedals': 1}}, (e, a)=>{
                        if (e) {
                            console.log(e);
                            res.status(400).json({'medal':'no'});
                        }
                        else {
                            res.status(200).json({'medal':'ok'});
                        }
                    });
                }
            });
        }
    });

    

    
    
});


// Update competition
router.route('/competitionFinished').post((req, res)=>{
    let name = req.body.name;

    competition.updateOne({competition: name}, { $set: {'finished': true} }, (e, aa) => {
        if (e) {
            console.log(e);
            res.status(400).json({'gg':'no'});
        }
        else {
            console.log('jedi govna');
            res.status(200).json({'gg':'ok'});
        }
    })
});

// Update tennis result
router.route('/updateTennisResult').post((req, res)=>{
    let name = req.body.name;
    let athletes = req.body.athletes;
    let format = req.body.format;

    competition.updateOne({competition: name}, { $set: {athletes: athletes, format: format, date: null} }, (e, aa) => {
        if (e) {
            console.log(e);
            res.status(400).json({'updatedTennis':'no'});
        }
        else {
            res.status(200).json({'updatedTennis':'ok'});
        }
    })
});

// Get competitions by location
router.route('/checkAnotherByLocation').post((req, res)=>{
    let location = req.body.location;

    competition.find({"location": location}, (err, comp)=>{
        if(err) console.log(err);
        else res.json(comp);
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));