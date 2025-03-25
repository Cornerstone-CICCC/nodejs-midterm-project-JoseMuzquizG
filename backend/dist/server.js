"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_session_1 = __importDefault(require("cookie-session"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middelware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Missing cookies keys.');
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 3 * 60 * 1000
}));
//Routes
app.use('/myaccount', account_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/', page_routes_1.default);
// Server Fallback
app.use((req, res) => {
    res.status(404).send("Page not found! :(");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
