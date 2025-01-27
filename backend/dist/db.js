"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectToDb;
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDb() {
    //@ts-ignore
    mongoose_1.default.connect(process.env.DB_CONNECT).then(() => {
        console.log("Connected to MongoDB");
    }).catch(e => console.log(e));
}
