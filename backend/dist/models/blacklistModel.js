"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blacklistSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 //in 24 hrs in sec
    }
});
exports.blacklistModel = mongoose_1.default.model('BlacklistToken', blacklistSchema);
