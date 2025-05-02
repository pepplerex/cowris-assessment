import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface UserPayload {
  email: string;
  id: number;
}

interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Generates a JWT token for user authentication
   * @param user - User information containing email and id
   * @returns Promise containing the signed JWT token
   * @throws Error if JWT signing fails
   */
  async generateToken(user: UserPayload): Promise<string> {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Hashes a plain text password using bcrypt
   * @param password - The plain text password to hash
   * @returns Promise containing the hashed password
   * @throws Error if hashing fails
   */
  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  /**
   * Compares a plain text password with a hashed password
   * @param password - The plain text password to compare
   * @param hash - The hashed password to compare against
   * @returns Promise<boolean> indicating if passwords match
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
