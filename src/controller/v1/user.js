import UserModel from '../../models/user';
import restMessage from '../../lib/restMessage'

const userCtrl = {
    id: 'userId',
    create({ body, res }) {
        let user = new UserModel(body);

        user.save()
            .then(({ _id }) => UserModel.findById(_id).then(result => res.send(result)))
            .catch(error => res.status(400).send(restMessage(error.message)))

    },
    read({ params: { userId } }, res) {
        UserModel.find({ username: userId })
            .then(result => res.send(result))
            .catch(() => res.status(404).send(restMessage("User Not found"))); ``
    },
    index({ params }, res) {
        res.json("asdas");
    },
}

export default userCtrl;