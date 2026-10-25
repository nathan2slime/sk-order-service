import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChannelWrapper, connect, SetupFunc } from "amqp-connection-manager";
import { AppConfig } from "~/config/configuration";

type ExchangeType = "direct" | "topic" | "fanout" | "headers";

type TopologyOptions = {
  exchange: string;
  queue: string;
} & Partial<{
  routingKey: string;
  exchangeType: ExchangeType;
}>;

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: ReturnType<typeof connect>;
  private channel: ChannelWrapper;

  constructor(private readonly config: ConfigService<AppConfig>) {}

  async onModuleInit() {
    const url = this.config.get("RABBITMQ_URL");

    this.connection = connect([url]);

    this.channel = this.connection.createChannel({
      json: true,
    });
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
      await this.connection.close();
    }
  }

  async assertTopology({
    exchange,
    queue,
    routingKey = "#",
    exchangeType = "topic",
  }: TopologyOptions) {
    await this.channel.addSetup(async (channel: Parameters<SetupFunc>[0]) => {
      await channel.assertExchange(exchange, exchangeType, {
        durable: true,
      });

      await channel.assertQueue(queue, {
        durable: true,
      });

      await channel.bindQueue(queue, exchange, routingKey);
    });
  }

  async publish<T>(exchange: string, routingKey: string, message: T) {
    return this.channel.publish(exchange, routingKey, message, {
      persistent: true,
    });
  }

  async consume<T>(queue: string, handler: (message: T) => Promise<void>) {
    await this.channel.consume(
      queue,
      async (message) => {
        if (message) {
          try {
            const payload = JSON.parse(message.content.toString()) as T;

            await handler(payload);

            this.channel.ack(message);
          } catch (error) {
            this.channel.nack(message, false, false);
          }
        }

        return;
      },
      { noAck: false },
    );
  }
}
