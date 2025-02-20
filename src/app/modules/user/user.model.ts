import { model, Schema } from 'mongoose'
import { Tuser } from './user.interface'

const userSchema = new Schema<Tuser>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required'],
  },
  address: {
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
})

export const userModel = model<Tuser>('User', userSchema)
