import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware.
 */
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};