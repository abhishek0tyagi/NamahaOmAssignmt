import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  if (req.user?.role !== 'admin') {
  res.status(403).json({ message: 'Access denied, admin only' });
  return;
  }
  next();
};
