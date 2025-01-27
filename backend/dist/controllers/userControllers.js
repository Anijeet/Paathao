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
exports.logoutUser = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const blacklistModel_1 = require("../models/blacklistModel");
const userServices_1 = __importDefault(require("../services/userServices"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { fullname, email, password } = req.body;
    const isEmail = yield userModels_1.default.findOne({ email });
    if (isEmail) {
        res.status(401).json({ message: "Email is already in use" });
        return;
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield (0, userServices_1.default)({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedpassword
    });
    console.log(user);
    const userId = user._id;
    const token = jsonwebtoken_1.default.sign({
        userId
    }, process.env.JWT_SECRET || "");
    res.status(200).json({ token, user });
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, password } = req.body;
    const user = yield userModels_1.default.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Invalid email" });
    }
    //@ts-ignore
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    //@ts-ignore
    const userId = user._id;
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            userId
        }, process.env.JWT_SECRET || "", { expiresIn: '24h' });
        res.cookie('token', token);
        res.json({
            token,
            user
        });
    }
    else {
        res.status(401).json({ message: "Incorrect password" });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res, next) => {
    //@ts-ignore
    res.status(201).json(req.user);
};
exports.getUserProfile = getUserProfile;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.clearCookie('token');
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    yield blacklistModel_1.blacklistModel.create({ token });
    res.status(201).json({ message: "Logged Out" });
});
exports.logoutUser = logoutUser;
