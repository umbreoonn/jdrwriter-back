import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super("Ce nom d'utilisateur n'est pas disponible.");
  }
}
