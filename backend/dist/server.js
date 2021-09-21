"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const country_1 = __importDefault(require("./model/country"));
const sport_1 = __importDefault(require("./model/sport"));
const competition_1 = __importDefault(require("./model/competition"));
const athlete_1 = __importDefault(require("./model/athlete"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/ba170578_PIA_project");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
const router = express_1.default.Router();
// Login
router.route('/loginToTheSystem').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ "username": username, "password": password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
// Get all countries
router.route('/getAllCountries').get((req, res) => {
    country_1.default.find({}, (err, countries) => {
        if (err)
            console.log(err);
        else
            res.json(countries);
    });
});
// Add new user
router.route('/register').post((req, res) => {
    let newUser = new user_1.default(req.body);
    newUser.save().then(e => {
        res.status(200).json({ 'newUser': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'newUser': 'no' });
    });
});
// Find user by username
router.route('/findUsername').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
// Change password
router.route('/changePassword').post((req, res) => {
    let username = req.body.username;
    let newPassword = req.body.newPassword;
    user_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            res.json({ "changePass": "greska" });
        else {
            user.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } });
            res.json({ "changePass": "ok" });
        }
    });
});
// Add new Sport
router.route('/addSport').post((req, res) => {
    let newSport = new sport_1.default(req.body);
    newSport.save().then(e => {
        res.status(200).json({ 'newSport': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'newSport': 'no' });
    });
});
// Find sport without discipline TREBA DODATI ZA OSTALE SLUCAJEVE
router.route('/findSportWithoutDiscipline').post((req, res) => {
    let s = req.body.sport;
    let type = req.body.type;
    let min = req.body.min;
    let max = req.body.max;
    sport_1.default.findOne({ "sport": s, "type": type, "min": min, "max": max }, (err, sport) => {
        if (err)
            console.log(err);
        else
            res.json(sport);
    });
});
// Get all sports
router.route('/getAllSports').get((req, res) => {
    sport_1.default.find({}, (err, sports) => {
        if (err)
            console.log(err);
        else
            res.json(sports);
    });
});
// OVO PREUREDITI
router.route('/addCompetition').post((req, res) => {
    let newCompetition = new competition_1.default(req.body);
    console.log(newCompetition);
    newCompetition.save().then(e => {
        res.status(200).json({ 'newCompetition': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'newCompetition': 'no' });
    });
});
// Find athlete
router.route('/findAthlete').post((req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    athlete_1.default.findOne({ "name": name, "surname": surname }, (err, athlete) => {
        if (err)
            console.log(err);
        else
            res.json(athlete);
    });
});
// Add discipline in athlete
router.route('/addDiscipline').post((req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let discipline = req.body.discipline;
    athlete_1.default.findOne({ "name": name, "surname": surname }, (err, a) => {
        if (err)
            console.log(err);
        else {
            if (a) {
                athlete_1.default.updateOne({ name: name, surname: surname }, { $push: { disciplines: discipline } }, (e, aa) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ 'addDiscipline': 'no' });
                    }
                    else {
                        res.status(200).json({ 'addDiscipline': 'ok' });
                    }
                });
            }
            else {
                res.status(200).json({ 'addDiscipline': 'no' });
            }
        }
    });
});
// Add new athlete
router.route('/addAthlete').post((req, res) => {
    let new_athlete = new athlete_1.default({
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        country: req.body.country,
        disciplines: [req.body.disciplines]
    });
    let coun = req.body.country;
    //console.log(new_athlete);
    new_athlete.save().then(e => {
        console.log("dodao sam");
        country_1.default.updateOne({ name: coun }, { $inc: { 'numberOfAthletes': 1 } }, (e, r) => {
            console.log(r);
            if (e) {
                res.status(400).json({ 'newAthlete': 'no' });
            }
            else {
                res.status(200).json({ 'newAthlete': 'ok' });
            }
        });
    }).catch(err => {
        console.log("nisam dodao");
        res.status(400).json({ 'newAthlete': 'no' });
    });
});
// Get all athletes
router.route('/getAllAthletes').get((req, res) => {
    athlete_1.default.find({}, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by name
router.route('/getAthleteByName').post((req, res) => {
    let name = req.body.name;
    athlete_1.default.find({ "name": name }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by surname
router.route('/getAthleteBySurname').post((req, res) => {
    let surname = req.body.surname;
    athlete_1.default.find({ "surname": surname }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by name and surname
router.route('/getAthleteByNameSurname').post((req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    athlete_1.default.find({ "name": name, "surname": surname }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by sport
router.route('/getAthleteBySport').post((req, res) => {
    let sport = req.body.sport;
    athlete_1.default.find({ "disciplines": sport }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by name and sport
router.route('/getAthleteByNameSport').post((req, res) => {
    let name = req.body.name;
    let sport = req.body.sport;
    athlete_1.default.find({ "name": name, "disciplines": sport }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by surname and sport
router.route('/getAthleteBySurnameSport').post((req, res) => {
    let surname = req.body.surname;
    let sport = req.body.sport;
    athlete_1.default.find({ "surname": surname, "disciplines": sport }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all athletes by all
router.route('/getAthleteByNameSurnameSport').post((req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let sport = req.body.sport;
    athlete_1.default.find({ "name": name, "surname": surname, "disciplines": sport }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get all delegates
router.route('/getAllDelegates').get((req, res) => {
    user_1.default.find({ "userType": "competitionDelegate" }, (err, delegates) => {
        if (err)
            console.log(err);
        else
            res.json(delegates);
    });
});
// Get individual sport
router.route('/getIndividualSport').get((req, res) => {
    sport_1.default.find({ "type": "individual" }, (err, delegates) => {
        if (err)
            console.log(err);
        else
            res.json(delegates);
    });
});
// Get all athletes sport and gender
router.route('/getAthleteBySportGender').post((req, res) => {
    let gender = req.body.gender;
    let sport = req.body.sport;
    athlete_1.default.find({ "disciplines": sport, "gender": gender }, (err, athletes) => {
        if (err)
            console.log(err);
        else
            res.json(athletes);
    });
});
// Get tennis
router.route('/getTennis').get((req, res) => {
    sport_1.default.find({ "discipline": "Singles" }, (err, sports) => {
        if (err)
            console.log(err);
        else
            res.json(sports);
    });
});
// Check delegate
router.route('/checkDelegate').post((req, res) => {
    let username = req.body.username;
    competition_1.default.find({ "delegate": username }, (err, comp) => {
        if (err)
            console.log(err);
        else
            res.json(comp);
    });
});
// Get competition
router.route('/getCompetition').post((req, res) => {
    let name = req.body.name;
    competition_1.default.findOne({ "competition": name }, (err, comp) => {
        if (err)
            console.log(err);
        else
            res.json(comp);
    });
});
// Add discipline in athlete
router.route('/updateCompetition').post((req, res) => {
    let name = req.body.name;
    let location = req.body.location;
    let date = new Date(req.body.date);
    console.log(name);
    competition_1.default.findOne({ "competition": name }, (err, a) => {
        if (err)
            console.log(err);
        else {
            if (a) {
                console.log("tu");
                console.log(date.toString());
                competition_1.default.updateOne({ competition: name }, { $set: { location: location, date: date } }, (e, aa) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ 'updatedComp': 'no' });
                    }
                    else {
                        res.status(200).json({ 'updatedComp': 'ok' });
                    }
                });
            }
            else {
                res.status(200).json({ 'updatedComp': 'no' });
            }
        }
    });
});
// Competition start
router.route('/competitionStart').post((req, res) => {
    let sport = req.body.sport;
    let discipline = req.body.discipline;
    competition_1.default.findOne({ "sport": sport, "discipline": discipline }, (err, comp) => {
        if (err)
            console.log(err);
        else
            res.json(comp);
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map