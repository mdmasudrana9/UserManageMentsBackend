export type Tuser = {
  userId: string
  userName: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive?: boolean
  hobbies: string[]
  address: {
    city: string
    state: string
    country: string
  }
  isDelete?: boolean | undefined
}
