import express from 'express'
 const router = express.Router()
 import { body } from "express-validator";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captainController';
import { captainMiddleware } from '../middleware/captainAuth';

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
    body('fullname.firstname').isLength({min:3}).withMessage("Firstname should be minimum 3 "),
    body('vechile.color').isLength({ min: 2 }).withMessage("Vvechile color must be min 2"),
    body('vechile.plate').isLength({ min: 2 }).withMessage("Vechile plate must be min 2"),
    body('vechile.capacity'),
    body('vechile.vechileType').isLength({ min: 2 }).withMessage("vechile Type must be min 2"),
    
],registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 2 }).withMessage("Password must be min 2"),
],loginCaptain);

router.get('/profile',captainMiddleware, getCaptainProfile)

router.get('/logout',captainMiddleware, logoutCaptain)



export default router