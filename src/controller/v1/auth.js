import { isEmpty } from 'lodash/fp';
import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';
import config from '../../config';
import httpstatus from 'http-status-codes';

const AuthCtrl = {
    Authenticate({body:{username, password}}, res){
        UserModel.findOne({username}).select("+password")
        .then(result => {
            if (isEmpty(result)){
                return res.status(httpstatus.UNAUTHORIZED).send({
                    message:"Authentication failed. user not found"
                })
            }
            result.comparePassword(password, (err, isMatch)=>{
                if(isMatch, !err){
                    var token = jwt.sign({sub : result._id}, config.jwtSecret, {
                        expiresIn: "2 days"
                    });

                    return res.json({
                        message :"Authentication success",
                        token
                    })
                }

                res.status(httpstatus.UNAUTHORIZED).send({
                    message:"Password not match"
                });
            })
        })
        .catch( err=> res.send(err.toString()))
    },
};
export default AuthCtrl;