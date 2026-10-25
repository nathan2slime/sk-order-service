import { Module } from "@nestjs/common";

import { OrderController } from "~/app/order/order.controller";
import { OrderMessaging } from "~/app/order/order.messaing";
import { OrderRepository } from "~/app/order/order.repository";
import { OrderService } from "~/app/order/order.service";
import { RabbitMQModule } from "~/rabbitmq/rabbitmq.module";

@Module({
  imports: [RabbitMQModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderMessaging],
})
export class OrderModule {}
