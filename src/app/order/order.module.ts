import { Module } from '@nestjs/common';

import { OrderItemModule } from '~/app/order-item/order-item.module';
import { OrderService } from '~/app/order/order.service';

@Module({
  imports: [OrderItemModule],
  controllers: [],
  providers: [OrderService],
})
export class OrderModule {}
