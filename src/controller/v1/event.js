import EventModel from '../../models/event';
import UserModel from '../../models/user';
import restMessage from '../../lib/restMessage';

const EventCtrl ={
    create({user, body}, res){
        let event = new EventModel(body)

        UserModel.find().where("username").in(body.users)
        .then((result)=>{
            // event
            for(var i =0; i< result.length; i++){
                event.usersInTheEvent.push(result[i]._id)
            }
            event.createdBy = user._id;
            event.save()
            .then(({ _id }) => EventModel.findById(_id).then(result => res.send(result)))
                .catch(error => res.status(400).send(restMessage(error.message)))
        })
        .catch((err)=>{
            console.log(err);
        });
    },
    list({body}, res){
        var endDate = new Date();
        var d = new Date();
        d.setDate(d.getDate() - 15)
        EventModel.find({startDate:{"$gte":d, "$lt":endDate}})
        .then((result)=>{
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    delete({user, body}, res){
        EventModel.findById(body.id)
        .then((result)=>{

        })
        .catch((err)=>{
            
        })
    }
}

export default EventCtrl;