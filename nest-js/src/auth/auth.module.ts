import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
