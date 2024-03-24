// src/help-request/help-request.controller.ts

import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'; // Adjust the path based on your project structure
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { HelpRequestService } from './help-request.service';

@Controller('help-request')
export class HelpRequestController {
  constructor(private readonly helpRequestService: HelpRequestService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post("add")
  async create(@Body() createHelpRequestDto: CreateHelpRequestDto, @Req() req)  {
    const user = req.user.id; // Extract user from request object
    return this.helpRequestService.create(createHelpRequestDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post(':id/solve')
  async provideSolution(@Param('id') id: number, @Req() req) {
    const user = req.user; // Extract user from request object
    return this.helpRequestService.provideSolution(id, user.id);
  }
}
