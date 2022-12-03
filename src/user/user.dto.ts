import { User } from './user.entity';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreationDto {
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsDefined()
  username: string;

  @MinLength(8)
  @IsString()
  @IsDefined()
  password: string;
}

export type AuthenticatedUser = Omit<User, 'password'>;
