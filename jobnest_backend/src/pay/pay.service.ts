import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';

const stripe = require('stripe')('sk_test_51M6xsMSGQlxq8EadTBFdHldKvFMwhpZSerARXb8qLIZW3AUQFBo6SyIgpkwy1g7NDDes6iNyU2XWG6yaDzjTVrxY00FKXNtQyx')

@Injectable()
export class PayService {

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async createCheckoutSession() {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: 'price_1MIT3ZSGQlxq8EadT0j9QNMc', quantity: 3 }],
      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      customer: 'cus_N2YAmRC6YKWslj',
      success_url: 'http://localhost:3000/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/pay/failed/checkout/session',
    });

    const job = await this.jobRepository.findOne({ where: { jobID:45} });

      // Check if job is found
      if (!job) {
        throw new Error('Job not found');
      }

      job.status = "success";
      await this.jobRepository.save(job);

    return session;
  }

  async handlePaymentSuccess(sessionId: string) {
    try {
      // Retrieve the job
      const job = await this.jobRepository.findOne({ where: { jobID:1} });

      // Check if job is found
      if (!job) {
        throw new Error('Job not found');
      }

      // Retrieve payment details
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const paymentIntentId = session.payment_intent;
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const amountPaid = paymentIntent.amount;
      const currency = paymentIntent.currency;
      const paymentMethod = paymentIntent.payment_method;

      // Update the status of the job
      job.status = "success";
      await this.jobRepository.save(job);

      // Return the payment details
      return {
        sessionId,
        amountPaid,
        currency,
        paymentMethod,
      };
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw new Error('Error handling payment success');
    }
  }
}
