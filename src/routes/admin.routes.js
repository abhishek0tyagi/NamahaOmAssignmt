"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_controller_1 = require("../controller/admin.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var role_middleware_1 = require("../middlewares/role.middleware");
var router = express_1.default.Router();
// Admin-only routes
router.post('/users', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.createUser);
router.get('/users', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.getUsers);
router.put('/users/:id', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.updateUser);
router.delete('/users/:id', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.deleteUser);
exports.default = router;
