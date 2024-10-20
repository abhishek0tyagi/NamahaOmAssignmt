import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user.model'; // Adjust import based on your user model path

// Create User (Admin Only)
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get All Users (Paginated & Filtered)
export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, role, name, email } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const query: any = {}; // Build a query object

    if (role) query.role = role;
    if (name) query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex
    if (email) query.email = { $regex: email, $options: 'i' };

    const users = await User.find(query).skip(skip).limit(Number(limit));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
