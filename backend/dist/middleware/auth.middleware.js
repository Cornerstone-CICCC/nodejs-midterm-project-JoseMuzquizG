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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountLoggedIn = void 0;
const isAccountLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    res.status(301).send("Redirect to login");
});
exports.isAccountLoggedIn = isAccountLoggedIn;
