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
            { fullname: "Bob Ross", email: "bobross@email.com", username: "bobRoss123", password: "lolipop321", id: "vus979sgbacs8cboa7eftc*CTucjNGtuGjn" }
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
}
exports.default = new UserModel;
