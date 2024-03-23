import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as qs from 'qs'; // Import qs for form data serialization
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class PaymentService {
    private readonly sslcommerzUrl: string = 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php';
    private readonly storeId: string = process.env.SSLCOMMERZ_STORE_ID;
    private readonly storePassword: string = process.env.SSLCOMMERZ_STORE_PASSWORD;
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) {}
    async initiatePayment(amount: number, customerDetails: any): Promise<any> {
        const paymentData = {
            store_id: this.storeId,
            store_passwd: this.storePassword,
            total_amount: amount,
            currency: 'BDT',
            tran_id: `TRAN_${new Date().getTime()}`,
            success_url: 'http://yourdomain.com/success',
            fail_url: 'http://yourdomain.com/fail',
            cancel_url: 'http://yourdomain.com/cancel',
            cus_name: customerDetails.name,
            cus_email: customerDetails.email,
            // Include additional fields required by SSLCommerz here
        };
 
        try {
            // Serialize data as x-www-form-urlencoded
            const response = await axios.post(this.sslcommerzUrl, qs.stringify(paymentData), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // Save payment info to the database
            const payment = this.paymentRepository.create({
                transactionId: paymentData.tran_id,
                amount: amount,
                status: 'INITIATED',
            });
            await this.paymentRepository.save(payment);
 
            // Return the payment gateway URL or necessary data to the client
            return response.data;
        } catch (error) {
            // Handle errors appropriately
            console.error('Payment initiation failed:', error);
            throw new Error('Payment initiation failed. Please try again.');
        }
    }
}