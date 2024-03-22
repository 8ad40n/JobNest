// bkash.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { BkashService } from './bkash.service';

@Controller('payments')
export class BkashController {
    constructor(private readonly bkashService: BkashService) {}

    @Post('create')
    async createPayment(@Body() paymentRequest: any) {
        try {
            const result = await this.bkashService.createPayment(paymentRequest);
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
