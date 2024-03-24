// src/feedback/feedback.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post("give")
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get('review/:id')
  async getAverageRating(@Param('id') id: number) {
    return this.feedbackService.getAverageRating(id);
  }
}
