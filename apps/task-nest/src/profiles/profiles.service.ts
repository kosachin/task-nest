// profiles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto.';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, dto: CreateProfileDto): Promise<ProfileEntity> {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const profile = this.profileRepo.create({ ...dto, user });
    const saved = await this.profileRepo.save(profile);

    // If it's user's first profile, set it as default
    if (!user.defaultProfileId) {
      user.defaultProfileId = saved.id;
      await this.usersService.update(user.id, { defaultProfileId: saved.id });
    }

    return saved;
  }

  async findAllByUser(userId: string): Promise<ProfileEntity[]> {
    return await this.profileRepo.find({
      where: { user: { id: userId } },
    });
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileEntity> {
    await this.profileRepo.update(id, dto);
    return await this.profileRepo.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.profileRepo.delete(id);
  }
}
