import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@src/auth/dto/in/create-user.dto';

export class CreateUserServiceReq extends PartialType(CreateUserDto) {}
