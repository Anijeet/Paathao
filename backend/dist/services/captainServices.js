"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createCaptain;
const captainModels_1 = require("../models/captainModels");
function createCaptain(_a) {
    return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, password, color, plate, vechileType, capacity }) {
        try {
            if (!firstname || !email || !password || !color || !plate || !vechileType || !capacity) {
                throw new Error('All fields are required.');
            }
        }
        catch (error) {
            console.log(error);
        }
        const captain = yield captainModels_1.captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vechile: {
                color,
                plate,
                vechileType,
                capacity
            }
        });
        return captain;
    });
}
