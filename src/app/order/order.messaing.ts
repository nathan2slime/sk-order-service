import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateOrderDto } from "~/app/order/order.dto";
import { RabbitMQService } from "~/rabbitmq/rabbitmq.service";

@Injectable()
export class OrderMessaging implements OnModuleInit {
  constructor(private readonly amqp: RabbitMQService) {}

  async onModuleInit() {
    await this.amqp.assertTopology({
      exchange: "order",
      queue: "order.pending",
      routingKey: "order.created",
      exchangeType: "topic",
    });
  }

  async publish(id: string, payload: CreateOrderDto) {
    return this.amqp.publish("order", "order.created", {
      id,
      payload,
    });
  }
}
