import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@src/user/dto/in/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
