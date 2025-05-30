import express from 'express'
import { userLogin, userLogout, userRegister, userUpdate } from '../controllers/user.controller.js';
import upload from '../config/multer.js';

const userRouter = express.Router();

userRouter.post('/register' , userRegister);
userRouter.post('/login', userLogin);
userRouter.get('/logout/:userid', userLogout);
userRouter.put("/update/:userid", upload.single("file"), userUpdate);


export default userRouter;