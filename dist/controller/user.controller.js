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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcrypt = __importStar(require("bcryptjs")); // Fix bcrypt import
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model")); // Adjust import based on your user model path
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcrypt.hash(password, 10);
    try {
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        // Check if user is null
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Verify password
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        // Generate token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        return;
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in', error });
        return;
    }
});
exports.loginUser = loginUser;
// Get User Profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Extracted from authMiddleware
    try {
        const user = yield user_model_1.default.findById(userId); // Use findById with Mongoose
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ name: user.name, email: user.email, registrationDate: user.createdAt });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});
exports.getUserProfile = getUserProfile;
