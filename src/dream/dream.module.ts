import { Module } from '@nestjs/common';
import { DreamService } from './dream.service';
import { DreamController } from './dream.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dream } from './dream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dream])],
  providers: [DreamService],
  controllers: [DreamController],
})
export class DreamModule {}
