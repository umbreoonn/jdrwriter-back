import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { AuthenticatedUser, UserCreationDto } from '../user/user.dto';
import { UserAlreadyExistsException } from '../exceptions/bad-request-exceptions';
import { RESOURCE_ALREADY_EXISTS } from '../exceptions/sql-errors';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService, private bcryptService: BcryptService) {}

  async validateUser(username: string, password: string): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    if (!(await this.bcryptService.verify(password, user.password))) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
    };
  }

  async login(user: AuthenticatedUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserCreationDto): Promise<AuthenticatedUser> {
    user.password = await this.bcryptService.hash(user.password);
    try {
      const savedUser = await this.usersService.create(user);
      return {
        id: savedUser.id,
        username: savedUser.username,
      };
    } catch (error) {
      if (error.errno === RESOURCE_ALREADY_EXISTS) {
        throw new UserAlreadyExistsException();
      }
      throw error;
    }
  }
}
