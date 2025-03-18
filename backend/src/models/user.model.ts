import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user'
import bcrypt from 'bcrypt'

class UserModel {
    private users: User[] = [
        { fullname: "Bob Ross", email: "bobross@email.com", username: "bobRoss123", password: "lolipop321", id: "vus979sgbacs8cboa7eftc*CTucjNGtuGjn"}
    ]

    async createUser(newUser: Omit<User, 'id'>) {
        const { fullname, email, username, password } = newUser
        const foundUsername = this.users.findIndex(user => user.username === username)
        if (foundUsername !== -1) return false
        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = {
            fullname,
            email,
            username,
            password: hashedPassword,
            id: uuidv4()
        }
        this.users.push(createdUser)
        return createdUser
    }
}


export default new UserModel