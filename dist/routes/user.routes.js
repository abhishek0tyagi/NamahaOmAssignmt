"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_2 = require("../controller/user.controller");
const router = express_1.default.Router();
// Public routes
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_2.loginUser);
// Protected routes
router.get('/profile', auth_middleware_1.authMiddleware, user_controller_1.getUserProfile);
exports.default = router;
