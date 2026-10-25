import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "~/app/order/order.module";

import configuration from "~/config/configuration";
import { DatabaseModule } from "~/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [".env.local"],
    }),
    DatabaseModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
