import { IsString } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class VerifyLoginDto extends LoginUserDto {
  @IsString()
  otp: string;

  @IsString()
  token: string;
}
