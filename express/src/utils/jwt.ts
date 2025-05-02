import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Generates a JWT token.
 * @param payload - The payload to sign.
 * @returns A signed JWT token.
 */
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token.
 * @param token - The token to verify.
 * @returns The decoded payload.
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};