import User from '../models/user.model';
import { subDays } from 'date-fns'; // You can use date-fns for date manipulation

export const fetchRecentUsers = async () => {
  try {
    // Get the date 7 days ago from today
    const sevenDaysAgo = subDays(new Date(), 7);

    // Fetch users registered within the last 7 days
    const recentUsers = await User.find({
      createdAt: { $gte: sevenDaysAgo },
    },{email:1,createdAt:1});

    // Log the recent users
    console.log('Users registered in the last 7 days:', recentUsers);
  } catch (error) {
    console.error('Error fetching recent users:', error);
  }
};