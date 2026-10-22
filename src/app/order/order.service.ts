import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from '~/app/order/order.dto';
import { DatabaseService } from '~/database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly database: DatabaseService) {}

  async create({ itens, ...payload }: CreateOrderDto) {
    return this.database.orm.Order.create({
      ...payload,
      itens: (p) => p.create(itens),
    });
  }
}
