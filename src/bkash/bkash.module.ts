// bkash.module.ts
import { Module } from '@nestjs/common';
import { bkashConfig } from './bkash-config';
import { BkashService } from './bkash.service';

@Module({
    providers: [
        {
            provide: 'BkashConfig',
            useValue: bkashConfig,
        },
        BkashService,
    ],
    exports: [BkashService],
})
export class BkashModule {}
