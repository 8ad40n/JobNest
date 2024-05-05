// jobProposal.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class JobProposalDto {
  @IsNotEmpty()
  jobID: number;

  @IsNotEmpty()
  userID: number;

  @IsNotEmpty()
  budget: number;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  coverLetter: string;
}

