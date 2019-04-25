import {Router } from 'express';
import AuthCtrl from '../../controller/v1/auth'


const AuthRouter = Router();

AuthRouter.post("/auth", AuthCtrl.Authenticate)

export default AuthRouter;