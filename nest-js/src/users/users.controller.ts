import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Register a new user
   * @param data The user registration data
   * @returns A message confirming user creation with the user's ID
   */
  @Post()
  async register(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  /**
   * Authenticate a user
   * @param body The login credentials
   * @returns JWT token and user information
   */
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.usersService.login(body);
  }

  /**
   * Retrieve all users
   * @returns Array of user entities
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Find a specific user by ID
   * @param id The user's ID
   * @returns The user entity if found
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update a user's information
   * @param id The user's ID
   * @param updateUserDto The updated user data
   * @returns The update result
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Remove a user from the system
   * @param id The user's ID
   * @returns The deletion result
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
