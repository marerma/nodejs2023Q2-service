import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @Put(':id')
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(id, dto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() res) {
    return this.usersService
      .deleteUser(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }
}
