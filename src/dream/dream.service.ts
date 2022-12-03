import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DreamDto } from './dream.dto';
import { Repository } from 'typeorm';
import { Dream } from './dream.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DreamService {
  private readonly logger = new Logger(DreamService.name);

  constructor(
    @InjectRepository(Dream)
    private dreamRepository: Repository<DreamDto>,
  ) {}

  async create(dreamDto: DreamDto) {
    this.logger.debug(`Saving new dream: ${JSON.stringify(dreamDto)}`);
    return this.dreamRepository.save(dreamDto);
  }

  async getOneById(id: number, userId: number) {
    this.logger.debug(`Fetching dream with id ${id} with userId ${userId}`);
    const dream = await this.dreamRepository.findOneBy({ id });
    if (!dream) {
      return new NotFoundException();
    }
    return dream.userId !== userId ? dream : new UnauthorizedException();
  }

  async getAllByUserId(userId: number) {
    this.logger.debug(`Fetching all dreams for user ${userId}`);
    return this.dreamRepository.findBy({ userId });
  }

  async deleteOneById(id: number, userId: number) {
    this.logger.debug(`Deleting dream with id ${id} with userId ${userId}`);
    const dream = await this.dreamRepository.findOneBy({ id, userId });
    if (!dream) {
      return new NotFoundException();
    }
    return this.dreamRepository.delete({
      id,
      userId,
    });
  }
}
