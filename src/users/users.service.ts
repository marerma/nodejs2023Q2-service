import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/types/types';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { DATA } from 'src/data-base';
import { validatePasswordDto, validateUserDto } from './utils';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto) {
    if (!validateUserDto(dto)) {
      throw new BadRequestException(
        'Please provide all requiered fields: login and password',
      );
    }
    const id = uuidv4();
    const user: User = {
      id,
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await DATA.users.push(user);
    const { password, ...userResp } = user;
    return userResp;
  }

  async getAllUsers() {
    const users = await DATA.users;
    const usersCopy = JSON.parse(JSON.stringify(users));
    usersCopy.forEach((user: User) => delete user.password);
    return usersCopy;
  }

  async getOneUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const user: User = await DATA.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User with the provided id is not found');
    }
    const { password, ...userResp } = user;

    return userResp;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!validatePasswordDto(dto)) {
      throw new BadRequestException(
        'Please provide all requiered fields: login and password',
      );
    }
    const userInd = await DATA.users.findIndex((u) => u.id === id);
    if (userInd === -1) {
      throw new NotFoundException('User with the provided id is not found');
    }
    const user = DATA.users[userInd];
    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('The old password is wrong!');
    }
    const updatedUser: User = {
      ...user,
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };
    DATA.users[userInd] = updatedUser;
    const { password, ...userResp } = updatedUser;

    return userResp;
  }

  async deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const userInd = await DATA.users.findIndex((u) => u.id === id);
    if (userInd === -1) {
      throw new NotFoundException('User with the provided id is not found');
    }
    await DATA.users.splice(userInd, 1);
    return;
  }
}
