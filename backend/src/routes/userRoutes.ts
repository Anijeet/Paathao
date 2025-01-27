import express from "express";
const router = express.Router()
import { body } from "express-validator"; //this libarary helps to validate all the req.body during method only
import {getUserProfile, loginUser, logoutUser, registerUser} from "../controllers/userControllers"
import { authMiddleware } from "../middleware/userAuth";

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
    body('fullname.firstname').isLength({min:3}).withMessage("Firstname should be minimum 3 ")
],registerUser);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
],loginUser);

router.get('/profile',authMiddleware, getUserProfile)

router.get('/logout',authMiddleware, logoutUser)


export default router;