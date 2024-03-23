import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Post('initiate')
    async initiatePayment(@Body() body) {
        // The body should contain amount and customerDetails
        return this.paymentService.initiatePayment(body.amount, body.customerDetails);
    }
}
