import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user'
import bcrypt from 'bcrypt'

class UserModel {
    private users: User[] = [
        { fullname: "Bob Ross", username: "bobRoss123", password: "lolipop321", id: "vus979sgbacs8cboa7eftc*CTucjNGtuGjn", email: "bobross@email.com"}
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

    findByUsername(username: string) {
        const user = this.users.find(u => u.username === username)
        if (!user) return null
        return user
    }

    async loginUser(username: string, password: string) {
        const user = this.users.find(u => u.username === username)
        if (!user) return false
        const samePassword = await bcrypt.compare(password, user.password)
        if (!samePassword) return false
        return user
    }
    
    removeUserById(id: string) {
        const foundIndex = this.users.findIndex(user => user.id === id)
        if (foundIndex === -1) return false
        this.users.splice(foundIndex, 1)
        return true
    }

    async updateUser(id: string, changes: Partial<User>) {
        const foundUser = this.users.findIndex(u => u.id === id)
        if (foundUser === -1) return false
        let hashedPassword = undefined
        if (changes.password) {
            hashedPassword = await bcrypt.hash(changes.password, 12)
        }
        const userChanged: User = {
            ...this.users[foundUser],
            fullname: changes.fullname ?? this.users[foundUser].fullname,
            username: changes.username ?? this.users[foundUser].username,
            password: hashedPassword ? hashedPassword : this.users[foundUser].password,
            email: changes.email ?? this.users[foundUser].email
        }
        this.users[foundUser] = userChanged
        return userChanged
    }
}


export default new UserModel