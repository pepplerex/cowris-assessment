import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private authService: AuthService,
  ) {}

  /**
   * Creates a new user in the database
   * @param createUserDto - Data for creating a new user
   * @returns A success message with the created user's ID
   */
  async storeUser(data: CreateUserDto) {
    const user = await this.userModel.save(data);
    return `User created with id: ${user.id}`;
  }

  /**
   * Creates a new user with hashed password
   * @param data - Data for creating a new user
   * @returns A success message with the created user's ID
   */
  async create(data: CreateUserDto) {
    const hashed = await this.authService.hashPassword(data.password);
    const user = await this.storeUser({ ...data, password: hashed });
    return user;
  }

  /**
   * Authenticates a user and generates a JWT token
   * @param data - User login credentials
   * @returns A JWT token if authentication is successful
   */
  async login(data: LoginDto) {
    const user = await this.findByEmail(data.email);
    if (
      !user ||
      !(await this.authService.comparePassword(data.password, user.password))
    ) {
      return { message: 'Invalid credentials' };
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }

  /**
   * Finds a user by email
   * @param email - The user's email
   * @returns The user entity or null if not found
   */
  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  /**
   * Retrieves all users from the database
   * @returns An array of user entities
   */
  async findAll() {
    return await this.userModel.find();
  }

  /**
   * Finds a single user by ID
   * @param id - The user's ID
   * @returns The user entity or null if not found
   */
  async findOne(id: number) {
    return await this.userModel.findOne({ where: { id } });
  }

  /**
   * Updates a user's information
   * @param id - The user's ID
   * @param data - The data to update
   * @returns The update result
   */
  async update(id: number, data: UpdateUserDto) {
    return await this.userModel.update(id, data);
  }

  /**
   * Removes a user from the database
   * @param id - The user's ID
   * @returns The delete result
   */
  async remove(id: number) {
    return await this.userModel.delete(id);
  }
}
