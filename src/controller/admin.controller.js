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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var bcrypt = require("bcryptjs");
var user_model_1 = require("../models/user.model"); // Adjust import based on your user model path
// Create User (Admin Only)
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, _b, role, hashedPassword, newUser, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, _b = _a.role, role = _b === void 0 ? 'user' : _b;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                hashedPassword = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                newUser = new user_model_1.default({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                });
                return [4 /*yield*/, newUser.save()];
            case 3:
                _c.sent();
                res.status(201).json({ message: 'User created successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                res.status(500).json({ message: 'Error creating user', error: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
// Get All Users (Paginated & Filtered)
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, role, name, email, skip, query, users, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, role = _a.role, name = _a.name, email = _a.email;
                skip = (Number(page) - 1) * Number(limit);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                query = {};
                if (role)
                    query.role = role;
                if (name)
                    query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex
                if (email)
                    query.email = { $regex: email, $options: 'i' };
                return [4 /*yield*/, user_model_1.default.find(query).skip(skip).limit(Number(limit))];
            case 2:
                users = _d.sent();
                res.json(users);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _d.sent();
                res.status(500).json({ message: 'Error fetching users', error: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// Update User
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, role, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findById(id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                user.name = name || user.name;
                user.email = email || user.email;
                user.role = role || user.role;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.json({ message: 'User updated successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Error updating user', error: error_3 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
// Delete User
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.default.findByIdAndDelete(id)];
            case 3:
                _a.sent();
                res.json({ message: 'User deleted successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Error deleting user', error: error_4 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
