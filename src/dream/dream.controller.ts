import { Body, Controller, Get, Post, Request, UseGuards, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DreamDto } from './dream.dto';
import { DreamService } from './dream.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dreams')
export class DreamController {
  constructor(private dreamService: DreamService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dreamCreationDto: DreamDto) {
    return this.dreamService.create({
      userId: req.user.userId,
      ...dreamCreationDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getAllByUserId(@Request() req) {
    return this.dreamService.getAllByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteOne(@Request() req, @Param() params) {
    return this.dreamService.deleteOneById(params.id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Request() req, @Param() params) {
    return this.dreamService.getOneById(params.id, req.user.userId);
  }
}
