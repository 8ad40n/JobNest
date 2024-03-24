// src/call/call.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CallService } from 'src/call/call.service';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get()
  makeCall() {
    return this.callService.makeCall();
  }
}
