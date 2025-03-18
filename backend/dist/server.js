"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const app = (0, express_1.default)();
// Middelware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Missing cookies keys.');
}
//Routes
app.use('/', page_routes_1.default);
// Server Fallback
app.use((req, res) => {
    res.status(404).send("Page not found! :(");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
