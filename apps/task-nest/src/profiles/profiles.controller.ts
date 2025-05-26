// profiles.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto.';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users/:userId/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Param('userId') userId: string, @Body() dto: CreateProfileDto) {
    return this.profilesService.create(userId, dto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.profilesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.delete(id);
  }
}
