import { Module } from '@nestjs/common';

import { OrderItemService } from '~/app/order-item/order-item.service';
import { OrderService } from '~/app/order/order.service';

@Module({
  providers: [OrderService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
