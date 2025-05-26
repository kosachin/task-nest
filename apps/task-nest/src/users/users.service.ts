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

  async findByPhone(countryCode: string, phoneNumber: string) {
    return await this.usersRepository.findByCondition({
      where: { countryCode, phoneNumber },
    });
  }

  async findOneById(userId) {
    return await this.usersRepository.findOneById(userId);
  }

  async update(userId, data) {
    return await this.usersRepository.update(userId, data);
  }
}
