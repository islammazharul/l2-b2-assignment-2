import { Schema, model } from 'mongoose';
import {
  TUser,
  UserModel,
  TUserName,
  TUserAddress,
  TOrderProduct,
} from './user/user.interface';
import config from '../config';
import bcrypt from 'bcrypt';

// mongoose schema for user name
const userNameSchema: Schema<TUserName> = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name must be required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be required'],
  },
});

// mongoose schema for user address
const userAddressSchema: Schema<TUserAddress> = new Schema({
  street: {
    type: String,
    required: [true, 'street must be required'],
  },
  city: {
    type: String,
    required: [true, 'city must be required'],
  },
  country: {
    type: String,
    required: [true, 'country must be required'],
  },
});

// mongoose schema for user order
const orderSchema: Schema<TOrderProduct> = new Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

// mongoose schema for user
const userSchema: Schema<TUser, UserModel> = new Schema({
  userId: {
    type: Number,
    required: [true, 'User ID must be required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name must be required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User password must be required'],
  },
  fullName: userNameSchema,
  age: {
    type: Number,
    required: [true, 'User age must be required'],
  },
  email: {
    type: String,
    required: [true, 'User email must be required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [String],
  address: userAddressSchema,
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// creating a custom method for existing user
userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return !!existingUser;
};

// Schema model for user
const User = model<TUser, UserModel>('User', userSchema);

export default User;
