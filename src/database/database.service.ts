import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { AppConfig } from "~/config/configuration";

import { PrismaClient } from "~/generated/prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService<AppConfig>) {
    super({
      log: ["query", "info", "warn", "error"],
      adapter: new PrismaPg(
        {
          connectionString: config.get("DATABASE_URL"),
        },
        { schema: "orders" },
      ),
    });
  }

  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.debug("Connection established successfully");
    } catch (e: unknown) {
      this.logger.error(e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
