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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/ba170578_PIA_project");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
const router = express_1.default.Router();
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
router.route('/getAllCountries').get((req, res) => {
    country_1.default.find({}, (err, countries) => {
        if (err)
            console.log(err);
        else
            res.json(countries);
    });
});
router.route('/register').post((req, res) => {
    let newUser = new user_1.default(req.body);
    newUser.save().then(e => {
        res.status(200).json({ 'newUser': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'newUser': 'no' });
    });
});
router.route('/findUsername').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
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
router.route('/addSport').post((req, res) => {
    let newSport = new sport_1.default(req.body);
    newSport.save().then(e => {
        res.status(200).json({ 'newSport': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'newSport': 'no' });
    });
});
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
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map