import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import { generateToken } from '../utils/jwt';

/**
 * Handles user-related business logic.
 */
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: Partial<User>) {
    const user = this.userRepository.create(data);
    user.password = await bcrypt.hash(user.password, 10);

    const errors = await validate(user);
    if (errors.length > 0) throw new Error('Validation failed');

    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}