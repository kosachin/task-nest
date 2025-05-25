import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as crypto from 'crypto';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyLoginDto } from './dto/verify-login.dto';

@Injectable()
export class AuthService {
  private readonly otpSecret: string;
  private readonly otpExpiryMs: number;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.otpSecret = this.configService.get<string>(
      'OTP_SECRET',
      'default-secret',
    );
    this.otpExpiryMs = parseInt(
      this.configService.get<string>('OTP_EXPIRY_MS', '300000'),
    ); // default 5 minutes
  }

  async create(loginUserDto: LoginUserDto) {
    const { countryCode, phoneNumber, role } = loginUserDto;

    try {
      if (!countryCode || !phoneNumber)
        throw new BadRequestException('Invalid phone number.');

      // Step 1: Check if user exists
      let user = await this.usersService.findByPhone(countryCode, phoneNumber);

      // Step 2: If not, create user
      if (!user) {
        user = await this.usersService.create({
          countryCode,
          phoneNumber,
          role,
        });
      }

      // Step 3: Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + this.otpExpiryMs;

      const payload = JSON.stringify({
        phone: `${countryCode}${phoneNumber}`,
        otp,
        exp: expiresAt,
      });

      const hmac = crypto
        .createHmac('sha256', this.otpSecret)
        .update(payload)
        .digest('hex');

      const token = Buffer.from(`${payload}|${hmac}`).toString('base64');

      // Step 4: Send OTP using Twilio or any SMS service (mock/placeholder here)
      // await this.smsService.sendOtp(`${countryCode}${phoneNumber}`, otp);

      this.logger.log(`OTP for ${countryCode}${phoneNumber}: ${otp}`);

      // Step 5: Return token (client will send this back for verification)
      return {
        message: 'OTP sent successfully.',
        token,
        otp,
      };
    } catch (error) {
      this.logger.error('Error in AuthService.create:', error?.stack);
      throw new InternalServerErrorException('Failed to process OTP request.');
    }
  }

  async verify(verifyLoginDto: VerifyLoginDto) {
    const { countryCode, phoneNumber, otp, token } = verifyLoginDto;

    const fullPhone = `${countryCode}${phoneNumber}`;

    try {
      if (!otp || !token) throw new BadRequestException('OTP is required.');

      const decoded = Buffer.from(token, 'base64').toString();
      const [payloadStr, hash] = decoded.split('|');

      const validHash = crypto
        .createHmac('sha256', this.otpSecret)
        .update(payloadStr)
        .digest('hex');
      if (hash !== validHash) throw new UnauthorizedException('Invalid OTP.');

      const payload: { phone: string; otp: string; exp: number } =
        JSON.parse(payloadStr);
      if (Date.now() > payload.exp)
        throw new UnauthorizedException('OTP has expired.');
      if (payload.phone !== fullPhone || payload.otp !== otp)
        throw new UnauthorizedException('OTP verification failed.');

      // Fetch user again to generate token
      const user = await this.usersService.findByPhone(
        countryCode,
        phoneNumber,
      );
      if (!user) throw new UnauthorizedException('User not found.');

      // Generate JWT
      const jwtPayload = {
        sub: user.id,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };
      const accessToken = this.jwtService.sign(jwtPayload);

      return {
        message: 'OTP verified successfully',
        accessToken,
      };
    } catch (error) {
      this.logger.error('Error in AuthService.verify:', error);
      throw error instanceof UnauthorizedException ||
        error instanceof BadRequestException
        ? error
        : new InternalServerErrorException('Authentication failed.');
    }
  }
}
