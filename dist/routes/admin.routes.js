"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/users', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.createUser);
router.get('/users', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.getUsers);
router.put('/users/:id', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.updateUser);
router.delete('/users/:id', auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, admin_controller_1.deleteUser);
exports.default = router;
