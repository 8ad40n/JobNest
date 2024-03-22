// bkash.service.ts
import { Inject, Injectable } from '@nestjs/common';
import BkashGateway from 'bkash-payment-gateway';

@Injectable()
export class BkashService {
    private bkash: any;

    constructor(@Inject('BkashConfig') private readonly bkashConfig) {
        this.bkash = new BkashGateway(bkashConfig);
    }

    async createPayment(paymentRequest: any) {
        return await this.bkash.createPayment(paymentRequest);
    }
}
