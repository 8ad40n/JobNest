import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CallService {
  constructor(private httpService: HttpService) {}

  makeCall(): Promise<string> {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Successfully call given');
      }, 5000); 
    });
  }
}
