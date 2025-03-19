import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user'
import bcrypt from 'bcrypt'

class UserModel {
    private users: User[] = [
        { fullname: "Bob Ross", email: "bobross@email.com", username: "bobRoss123", password: "lolipop321", id: "vus979sgbacs8cboa7eftc*CTucjNGtuGjn"}
    ]

    async createUser(newUser: Omit<User, 'id'>) {
        const { fullname, username, password } = newUser
        const foundUsername = this.users.findIndex(user => user.username === username)
        if (foundUsername !== -1) return false
        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = {
            fullname,
            username,
            password: hashedPassword,
            id: uuidv4()
        }
        this.users.push(createdUser)
        return createdUser
    }

    async loginUser(username: string, password: string) {
        const user = this.users.find(u => u.username === username)
        if (!user) return false
        const samePassword = await bcrypt.compare(password, user.password)
        if (!samePassword) return false
        return user
    }
    
}


export default new UserModel