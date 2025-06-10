import { IsString, Matches, IsNotEmpty, IsEnum } from 'class-validator';
import { ROLES } from '@app/common/constants';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+\d{1,4}$/, {
    message:
      'countryCode must be in the format +<country code> (e.g., +1, +91)',
  })
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5,15}$/, {
    message: 'phoneNumber must be a valid number with 5 to 15 digits',
  })
  phoneNumber: string;

  @IsEnum(ROLES, {
    message: 'role must be one of CUSTOMER, PARTNER, or ADMIN',
  })
  @Matches(/^(CUSTOMER|PARTNER|ADMIN)$/, {
    message: 'role must be one of CUSTOMER, PARTNER, or ADMIN',
  })
  role: ROLES;
}
