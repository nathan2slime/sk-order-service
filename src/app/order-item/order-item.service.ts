import { Injectable } from '@nestjs/common';

import { CreateOrderItemDto } from '~/app/order-item/order-item.dto';
import { DatabaseService } from '~/database/database.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly database: DatabaseService) {}

  async create(data: CreateOrderItemDto) {
    return this.database.orm.OrderItem.create(data);
  }
}
