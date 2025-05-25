import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyLoginDto } from './dto/verify-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.create(loginUserDto);
  }

  @Post('verify-login')
  async verify(@Body() verifyUserDto: VerifyLoginDto) {
    return this.authService.verify(verifyUserDto);
  }
}
