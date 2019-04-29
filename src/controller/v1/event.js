import EventModel from '../../models/event';
import UserModel from '../../models/user';
import restMessage from '../../lib/restMessage';
import httpstatus from 'http-status-codes';

const EventCtrl = {
    create({ user, body }, res) {
        let event = new EventModel(body)

        UserModel.find().where("username").in(body.users)
            .then((result) => {
                // event
                for (var i = 0; i < result.length; i++) {
                    event.usersInTheEvent.push(result[i]._id)
                }
                event.createdBy = user._id;
                event.save()
                    .then(({ _id }) => EventModel.findById(_id).then(result => res.send(result)))
                    .catch(error => res.status(400).send(restMessage(error.message)))
            })
            .catch((err) => {
                console.log(err);
            });
    },
    list({ body }, res) {
        var endDate = new Date();
        var d = new Date();
        d.setDate(d.getDate() - 15)
        EventModel.find({ startDate: { "$gte": d, "$lt": endDate } })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    update({ user, body }, res) {
        EventModel.findById(body.id)
            .then((event) => {
                if (event) {
                    if (event.createdBy != user.id) {
                        res.status(httpstatus.BAD_REQUEST).send({ message: "cannot update other users event" })
                    } else {
                        event.name = body.name;
                        event.startDate = body.startDate;
                        event.enddate = body.endDate;
                        event.usersInTheEvent = [];
                        UserModel.find().where("username").in(body.users)
                            .then((result) => {
                                // event
                                for (var i = 0; i < result.length; i++) {
                                    event.usersInTheEvent.push(result[i]._id)
                                }
                                EventModel.update({_id : body.id}, event)
                                    .then((result) => res.status(httpstatus.OK).send(event))
                                    .catch(error => res.status(400).send(restMessage(error.message)))
                            })
                    }
                } else {
                    res.status(httpstatus.NOT_FOUND).send({ message: "data not found" });
                }
            })
            .catch((err) => {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send({message:"internal server error."})
            })
    },
    delete({ user, body }, res) {
        EventModel.findById(body.id)
            .then((result) => {
                if (result) {
                    if (result.createdBy != user.id) {
                        res.status(httpstatus.BAD_REQUEST).send({ message: "Cannot delete other users event" });
                    } else {
                        result.remove();
                        res.status(httpstatus.OK).send({ message: "Ok" });
                    }
                } else {
                    res.status(httpstatus.NOT_FOUND).send({ message: "Data not found" });
                }
            })
            .catch((err) => {

            })
    }
}

export default EventCtrl;