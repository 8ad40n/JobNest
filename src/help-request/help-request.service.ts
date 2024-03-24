import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelpRequest } from 'src/entities/help-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelpRequestService {
  constructor(
    @InjectRepository(HelpRequest)
    private helpRequestRepository: Repository<HelpRequest>,
  ) {}

  async create(helpRequestDto: any, userId: number): Promise<HelpRequest> {
    // const helpRequest = this.helpRequestRepository.create({ ...helpRequestDto, requestedById: userId });
    helpRequestDto.requestedById= userId;
    return this.helpRequestRepository.save(helpRequestDto);
  }

  async provideSolution(requestId: number, userId: number): Promise<HelpRequest> {
    const helpRequest = await this.helpRequestRepository.findOne({ where: { id: requestId } });

    if (!helpRequest) {
      throw new NotFoundException('Help request not found');
    }
    helpRequest.solvedById = userId;
    return this.helpRequestRepository.save(helpRequest);
  }
}
