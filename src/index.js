import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routerV1 from './routes/v1'
import cors from 'cors'
import http  from 'http'
import passport from 'passport'
import morgan from 'morgan'
import config from './config';
import initDB from './db' 
import passportMiddleware from './middleware/passport'
import { logger } from './lib/utils';


const app= express();

app.server = http.createServer(app);

app.use(morgan('dev'))
app.use(cors({exposedHeaders:config.corsHeaders}));
app.use(bodyParser.json({limit:config.bodyLimit}));

initDB(()=>{
    app.use(passport.initialize());
    passportMiddleware(passport);

    app.use("/api", routerV1)
    app.server.listen(process.env.PORT || config.port, () => {
		logger.info(`Started on port ${app.server.address().port}`);
	});
})

export default app;