import express from 'express'
import { adminDelete, getAllAdmins, getAllStudents, getDashboard, getSingleAdmin, getSingleStudent, getSingleUser, logout, studentDelete, updateSingleAdmin, updateSingleStudent, userLogin, userRegister } from '../controllers/userController.js';
import userVerifyToken from '../middlewares/verifyToken.js';
import checkUserToken from '../middlewares/checkToken.js';
const authRouter = express.Router();

authRouter.post('/add-user',userRegister);
authRouter.post('/login',userLogin);
authRouter.get('/verify',userVerifyToken);
authRouter.post('/logout', logout);
authRouter.get('/getAllStudents',checkUserToken, getAllStudents);
authRouter.get('/getAllAdmins',checkUserToken ,getAllAdmins);
authRouter.get('/edit-admin/:id' ,getSingleAdmin);
authRouter.put('/update-admin/:id' ,updateSingleAdmin);
authRouter.delete('/delete-admin/:id', adminDelete);
authRouter.get('/edit-student/:id',getSingleStudent);
authRouter.put('/update-student/:id',updateSingleStudent);
authRouter.delete('/delete-student/:id', studentDelete);
authRouter.get('/getSingleUser/:id',getSingleUser);
authRouter.get('/dashboard', getDashboard)
export default authRouter;