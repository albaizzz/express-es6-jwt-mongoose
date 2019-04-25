import {Router} from 'express';

// import eventApi from './eventcalendar';
// import authApi from './auth';
import TestRoute from './test';
import UserRoute from './user';
import AuthRoute from './auth'
import auth from '../../middleware/require-auth';

const api = Router();

// api.use("/v1/user",userApi);
// api.use("/v1/auth", authApi);
// api.use("/v1/event", auth, eventApi);

api.use("/v1/auth", AuthRoute)
api.use("/v1/user", UserRoute);
api.use("/v1/test",auth, TestRoute);

export default api;
