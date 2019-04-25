import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username : {type: String,required : true,unique : true},
    password: { type: String, required: true, select: false },
    created_at: { type: Date, default: new Date() },
})

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      
      return cb(null, isMatch);
    });
  };
  
  const UserModel = mongoose.model('UserData', UserSchema);
  
  export default UserModel;