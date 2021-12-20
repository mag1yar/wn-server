import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/Unique.validation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3)
  @UniqueOnDatabase(UserEntity, { message: 'This login already exists.' })
  login: string;
  @IsEmail()
  @UniqueOnDatabase(UserEntity, { message: 'This email already exists.' })
  email: string;
  @Length(6)
  password: string;
}
