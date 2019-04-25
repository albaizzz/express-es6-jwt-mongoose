import {Router } from 'express';
import EventCtrl from '../../controller/v1/event';



const EventRouter = Router();

EventRouter.post("/", EventCtrl.create)
EventRouter.get("/", EventCtrl.list)
EventRouter.delete("/")


export default EventRouter;