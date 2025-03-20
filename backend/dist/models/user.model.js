"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.users = [
            { fullname: "Bob Ross", username: "bobRoss123", password: "lolipop321", id: "vus979sgbacs8cboa7eftc*CTucjNGtuGjn", email: "bobross@email.com" }
        ];
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, username, password } = newUser;
            const foundUsername = this.users.findIndex(user => user.username === username);
            if (foundUsername !== -1)
                return false;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const createdUser = {
                fullname,
                username,
                password: hashedPassword,
                id: (0, uuid_1.v4)()
            };
            this.users.push(createdUser);
            return createdUser;
        });
    }
    findByUsername(username) {
        const user = this.users.find(u => u.username === username);
        if (!user)
            return null;
        return user;
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(u => u.username === username);
            if (!user)
                return false;
            const samePassword = yield bcrypt_1.default.compare(password, user.password);
            if (!samePassword)
                return false;
            return user;
        });
    }
    removeUserById(id) {
        const foundIndex = this.users.findIndex(user => user.id === id);
        if (foundIndex === -1)
            return false;
        this.users.splice(foundIndex, 1);
        return true;
    }
    updateUser(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const foundUser = this.users.findIndex(u => u.id === id);
            if (foundUser === -1)
                return false;
            let hashedPassword = undefined;
            if (changes.password) {
                hashedPassword = yield bcrypt_1.default.hash(changes.password, 12);
            }
            const userChanged = Object.assign(Object.assign({}, this.users[foundUser]), { fullname: (_a = changes.fullname) !== null && _a !== void 0 ? _a : this.users[foundUser].fullname, username: (_b = changes.username) !== null && _b !== void 0 ? _b : this.users[foundUser].username, password: hashedPassword ? hashedPassword : this.users[foundUser].password, email: (_c = changes.email) !== null && _c !== void 0 ? _c : this.users[foundUser].email });
            this.users[foundUser] = userChanged;
            return userChanged;
        });
    }
}
exports.default = new UserModel;
