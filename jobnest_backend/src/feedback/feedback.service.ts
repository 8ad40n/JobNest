// src/feedback/feedback.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    //const feedback = this.feedbackRepository.create(createFeedbackDto);
    const feedback = new Feedback();

  // Set the properties that come directly from the DTO
  feedback.rating = createFeedbackDto.rating;
  feedback.comment = createFeedbackDto.comment;

  // If givenById and receivedById are just foreign key columns, set them directly
  feedback.givenById = createFeedbackDto.givenById;
  feedback.receivedById = createFeedbackDto.receivedById;

  // If you also want to set the relations, you'd need to load the User entities:
  // feedback.givenBy = await this.userRepository.findOne(createFeedbackDto.givenById);
  // feedback.receivedBy = await this.userRepository.findOne(createFeedbackDto.receivedById);

    return this.feedbackRepository.save(feedback);

    
  }

  async getAverageRating(receivedById: number): Promise<number> {
    const averageRating = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .select('AVG(feedback.rating)', 'average')
      .where('feedback.receivedById = :receivedById', { receivedById })
      .getRawOne();
  
    return parseFloat(averageRating.average);
  }
   
  
}
