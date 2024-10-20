"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var user_controller_2 = require("../controller/user.controller");
var router = express_1.default.Router();
// Public routes
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_2.loginUser);
// Protected routes
router.get('/profile', auth_middleware_1.authMiddleware, user_controller_1.getUserProfile);
exports.default = router;
