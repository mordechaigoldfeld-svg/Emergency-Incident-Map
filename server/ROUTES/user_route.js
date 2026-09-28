import { loginUserCntrl,registerUserCntrl } from "../CONTROLER/user_cntrl.js";
import express from 'express'
import { validCreateFields,validLoginFields } from "../MIDDLEWARE/user_middle.js";



const router = express.Router()

export default router


router.post('/login', validLoginFields, loginUserCntrl)


router.post('/register',validCreateFields,registerUserCntrl)