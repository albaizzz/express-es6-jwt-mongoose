import {Router} from 'express';
import userApi from './user';
import eventApi from './event';
import authApi from './auth';
import test from './test';
import auth from '../../middleware/require-auth';

const api = Router();

api.use("/v1/user",userApi);
api.use("/v1/auth", authApi);
api.use("/v1/event", auth, eventApi);
api.use("/v1/test", test);

export default api;
