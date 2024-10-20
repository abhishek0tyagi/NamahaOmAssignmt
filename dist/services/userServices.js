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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const date_fns_1 = require("date-fns"); // You can use date-fns for date manipulation
const fetchRecentUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the date 7 days ago from today
        const sevenDaysAgo = (0, date_fns_1.subDays)(new Date(), 7);
        // Fetch users registered within the last 7 days
        const recentUsers = yield user_model_1.default.find({
            createdAt: { $gte: sevenDaysAgo },
        }, { name: 1, _id: 0, email: 1, createdAt: 1 });
        // Log the recent users
        console.log('Users registered in the last 7 days:', recentUsers);
    }
    catch (error) {
        console.error('Error fetching recent users:', error);
    }
});
exports.fetchRecentUsers = fetchRecentUsers;
