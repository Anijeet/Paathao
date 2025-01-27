"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const captainController_1 = require("../controllers/captainController");
const captainAuth_1 = require("../middleware/captainAuth");
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
    (0, express_validator_1.body)('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname should be minimum 3 "),
    (0, express_validator_1.body)('vechile.color').isLength({ min: 2 }).withMessage("Vvechile color must be min 2"),
    (0, express_validator_1.body)('vechile.plate').isLength({ min: 2 }).withMessage("Vechile plate must be min 2"),
    (0, express_validator_1.body)('vechile.capacity'),
    (0, express_validator_1.body)('vechile.vechileType').isLength({ min: 2 }).withMessage("vechile Type must be min 2"),
], captainController_1.registerCaptain);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
], captainController_1.loginCaptain);
router.get('/profile', captainAuth_1.captainMiddleware, captainController_1.getCaptainProfile);
router.get('/logout', captainAuth_1.captainMiddleware, captainController_1.logoutCaptain);
exports.default = router;
