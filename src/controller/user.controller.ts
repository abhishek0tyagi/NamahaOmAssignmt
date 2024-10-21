import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';     // Fix bcrypt import
import * as jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model'; // Adjust import based on your user model path

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); //hashing password

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user is null
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Generate token
    const token: string = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({ token });
    return;
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error });
    return;
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId; // Extracted from authMiddleware

  try {
    const user = await User.findById(userId); // Use findById with Mongoose
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ name: user.name, email: user.email, registrationDate: user.createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};
