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
exports.captainMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blacklistModel_1 = require("../models/blacklistModel");
const captainModels_1 = require("../models/captainModels");
const captainMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    if (!token) {
        res.status(401).json({ message: "Not found token" });
        return;
    }
    const isBlacklisted = yield blacklistModel_1.blacklistModel.findOne({ token: token });
    if (isBlacklisted) {
        res.status(401).json({ message: "captain is logout" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        //@ts-ignore
        //@ts-ignore
        const captain = yield captainModels_1.captainModel.findById(decoded.captainId);
        console.log(captain);
        // @ts-ignore
        req.captain = captain;
        //@ts-ignore
        return next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.captainMiddleware = captainMiddleware;
