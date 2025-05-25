import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async find({
    email,
    countryCode,
    phoneNumber,
  }: {
    email?: string;
    countryCode?: string;
    phoneNumber?: string;
  }): Promise<UserEntity | null> {
    if (!email && (!countryCode || !phoneNumber)) {
      throw new Error(
        'Either email or countryCode + phoneNumber must be provided',
      );
    }

    const where: any = [];
    if (email) where.push({ email });
    if (countryCode && phoneNumber) where.push({ countryCode, phoneNumber });

    return await this.usersRepository.findByCondition({
      where,
    });
  }
}
