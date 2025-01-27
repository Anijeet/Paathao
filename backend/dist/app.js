"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const captainRoutes_1 = __importDefault(require("./routes/captainRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/users', userRoutes_1.default);
app.use('/captains', captainRoutes_1.default);
exports.default = app;
