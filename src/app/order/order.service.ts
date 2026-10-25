import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { CreateOrderDto } from "~/app/order/order.dto";
import { OrderMessaging } from "~/app/order/order.messaing";
import { OrderRepository } from "~/app/order/order.repository";
import { Order } from "~/generated/prisma/client";

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly messaging: OrderMessaging,
  ) {}

  async create(payload: CreateOrderDto) {
    const data: Record<string, Order | null> = {
      order: null,
    };

    try {
      data.order = await this.repository.create(payload);
      await this.messaging.publish(data.order.id, payload);
    } catch (error) {
      if (data.order) {
        await this.repository.delete(data.order.id);
      }

      throw new HttpException(
        error instanceof Error ? error.message : "",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
