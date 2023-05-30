import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1],
  },
  tokens: [{
    type: String,
    required: true
  }],
  resetLink: {
    type: String,
    default: ''
  }
}, { timestamps: true })



userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()
  delete userObj.password;
  return userObj

}
const User = model('users', userSchema)

export default User