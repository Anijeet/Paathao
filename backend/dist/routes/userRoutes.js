"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator"); //this libarary helps to validate all the req.body during method only
const userControllers_1 = require("../controllers/userControllers");
const userAuth_1 = require("../middleware/userAuth");
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
    (0, express_validator_1.body)('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname should be minimum 3 ")
], userControllers_1.registerUser);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
], userControllers_1.loginUser);
router.get('/profile', userAuth_1.authMiddleware, userControllers_1.getUserProfile);
router.get('/logout', userAuth_1.authMiddleware, userControllers_1.logoutUser);
exports.default = router;
