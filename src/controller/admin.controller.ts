import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

// Create User (Admin Only)
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = role;

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
    const query = User.createQueryBuilder('user');

    if (role) query.andWhere('user.role = :role', { role });
    if (name) query.andWhere('user.name LIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('user.email LIKE :email', { email: `%${email}%` });

    const users = await query.skip(skip).take(Number(limit)).getMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const adminId = parseInt(id,10)
    const user = await User.findOne({where:{id:adminId}});
    if (!user){ res.status(404).json({ message: 'User not found' }); return;}

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
export const deleteUser = async (req: Request, res: Response):Promise<void> => {
  let { id } = req.params;

  try {
    let adminId  = parseInt(id,10);
    const user = await User.findOne({ where: { id: adminId } });
    if (!user) { 
      res.status(404).json({ message: 'User not found' })
      return
    };

    await User.delete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
