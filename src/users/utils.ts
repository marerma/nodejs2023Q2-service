import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

export const validateUserDto = (dto: CreateUserDto) => {
  return (
    dto &&
    'login' in dto &&
    'password' in dto &&
    !!dto.login &&
    typeof dto.password === 'string' &&
    typeof dto.login === 'string'
  );
};

export const validatePasswordDto = (dto: UpdatePasswordDto) => {
  return (
    dto &&
    'oldPassword' in dto &&
    'newPassword' in dto &&
    !!dto.oldPassword &&
    !!dto.newPassword &&
    typeof dto.oldPassword === 'string' &&
    typeof dto.newPassword === 'string'
  );
};
