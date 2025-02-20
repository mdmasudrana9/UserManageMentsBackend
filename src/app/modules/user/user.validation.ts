import zod from 'zod'

const userZodValidationSchema = zod.object({
  userId: zod.string().trim().min(1, 'User ID is required'),
  userName: zod.string().trim().min(1, 'User name is required'),
  password: zod.string().trim().min(1, 'Password is required'),
  fullName: zod.object({
    firstName: zod.string().trim().min(1, 'First name is required'),
    lastName: zod.string().trim().min(1, 'Last name is required'),
  }),
  age: zod.number().min(1, 'Age is required'),
  email: zod.string().trim().email('Invalid email format'),
  isActive: zod.boolean().optional(),
  hobbies: zod.array(zod.string()).min(1, 'Hobbies is required'),
  address: zod.object({
    city: zod.string().trim().min(1, 'City is required'),
    state: zod.string().trim().min(1, 'State is required'),
    country: zod.string().trim().min(1, 'Country is required'),
  }),
  isDelete: zod.boolean().optional(),
})

export default userZodValidationSchema
