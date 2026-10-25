import { Injectable } from "@nestjs/common";

import { CreateOrderDto } from "~/app/order/order.dto";
import { DatabaseService } from "~/database/database.service";
import { OrderStatus } from "~/generated/prisma/enums";

@Injectable()
export class OrderRepository {
  constructor(private readonly database: DatabaseService) {}

  async create({ itens }: CreateOrderDto) {
    return this.database.order.create({
      data: {
        status: OrderStatus.PENDING,
        itens: {
          createMany: {
            data: itens,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return this.database.order.delete({
      where: {
        id,
      },
    });
  }
}
