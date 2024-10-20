import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

// declare global {
//     namespace Express {
//       interface Request {
//         user?: {
//           id:string;
//           userId: string;
//           role: string;
//         };
//       }
//     }
//   }

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;

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
      const user = await User.findOne({ where: { email } });
  
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
      const token:string = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
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
  let userId  = req.user?.userId; // Extracted from authMiddleware

  try {
    const user = await User.findOne({ where: { id: Number(userId) } });
    if (!user) 
    {
         res.status(404).json({ message: 'User not found' }) 
        return;
    }

    res.json({ name: user.name, email: user.email, registrationDate: user.createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};
