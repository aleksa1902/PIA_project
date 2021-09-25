"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Competition = new Schema({
    competition: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    format: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    delegate: {
        type: String
    },
    finished: {
        type: Boolean
    },
    athletes: [{
            type: String
        }],
    results: [{
            type: String
        }]
});
exports.default = mongoose_1.default.model('Competition', Competition, 'competitions');
//# sourceMappingURL=competition.js.map