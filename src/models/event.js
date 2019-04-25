import mongoose from 'mongoose';
import { stringify } from 'querystring';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name :{type:String, required:true, unique:true},
    startDate : {type: Date, required: true},
    endDate : {type : Date, required: true},
    usersInTheEvent: [{type : mongoose.Schema.ObjectId , ref:"UserData"}],
    createdBy :{type:mongoose.Schema.ObjectId, ref:"UserData"},
    createdAt : {type:Date, default: new Date()}
})

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;