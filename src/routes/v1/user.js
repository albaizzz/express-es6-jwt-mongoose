import {Router} from 'express';
import userCtrl from '../../controller/v1/user';

const UserRoute = Router();

UserRoute.post("/", userCtrl.create);

export default UserRoute;