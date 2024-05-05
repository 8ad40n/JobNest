// pay.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get('create-checkout-session')
  async createCheckoutSession() {
    const session = await this.payService.createCheckoutSession();
    return session;
  }

  // @Get('success/checkout/session/:sessionId')
  // async paymentSuccess(@Param('sessionId') sessionId: string) {
  //   const transactionDetails = await this.payService.handlePaymentSuccess(sessionId);
  //   return transactionDetails;
  // }
}
