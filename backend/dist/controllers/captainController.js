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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutCaptain = exports.getCaptainProfile = exports.loginCaptain = exports.registerCaptain = void 0;
const captainServices_1 = __importDefault(require("../services/captainServices"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const captainModels_1 = require("../models/captainModels");
const blacklistModel_1 = require("../models/blacklistModel");
const registerCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { fullname, email, password, vechile } = req.body;
    const isEmail = yield captainModels_1.captainModel.findOne({ email });
    if (isEmail) {
        res.status(401).json({ message: "Email is already in use" });
        return;
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    const captain = yield (0, captainServices_1.default)({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedpassword,
        color: vechile.color,
        plate: vechile.plate,
        capacity: vechile.capacity,
        vechileType: vechile.vechileType
    });
    const captainId = captain._id;
    const token = jsonwebtoken_1.default.sign({
        captainId
    }, process.env.JWT_SECRET || "");
    res.status(200).json({ token, captain });
});
exports.registerCaptain = registerCaptain;
const loginCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, password } = req.body;
    const captain = yield captainModels_1.captainModel.findOne({ email });
    if (!captain) {
        res.status(401).json({ message: "Invalid email" });
    }
    //@ts-ignore
    const passwordMatch = yield bcrypt_1.default.compare(password, captain.password);
    //@ts-ignore
    const captainId = captain._id;
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            captainId
        }, process.env.JWT_SECRET || "", { expiresIn: '24h' });
        res.cookie('token', token);
        res.json({
            token,
            captain
        });
    }
    else {
        res.status(401).json({ message: "Incorrect password" });
    }
});
exports.loginCaptain = loginCaptain;
const getCaptainProfile = (req, res, next) => {
    //@ts-ignore
    res.status(201).json(req.captain);
};
exports.getCaptainProfile = getCaptainProfile;
const logoutCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.clearCookie('token');
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    yield blacklistModel_1.blacklistModel.create({ token });
    res.status(201).json({ message: "Logged Out" });
});
exports.logoutCaptain = logoutCaptain;
