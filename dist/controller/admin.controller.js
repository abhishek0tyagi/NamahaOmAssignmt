"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model")); // Adjust import based on your user model path
// Create User (Admin Only)
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role = 'user' } = req.body;
    const hashedPassword = yield bcrypt.hash(password, 10);
    try {
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            role,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
// Get All Users (Paginated & Filtered)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, role, name, email } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const query = {}; // Build a query object
        if (role)
            query.role = role;
        if (name)
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex
        if (email)
            query.email = { $regex: email, $options: 'i' };
        const users = yield user_model_1.default.find(query).skip(skip).limit(Number(limit));
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
exports.getUsers = getUsers;
// Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        yield user.save();
        res.json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});
exports.updateUser = updateUser;
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        yield user_model_1.default.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;
