import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hash(data: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(data, saltOrRounds);
  }

  verify(data: string, hash: string): Promise<Boolean> {
    return bcrypt.compare(data, hash);
  }
}
