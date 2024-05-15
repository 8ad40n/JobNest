import { IsInt, IsString } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  senderId: number;

  @IsInt()
  receiverId: number;

  @IsString()
  message: string;
}