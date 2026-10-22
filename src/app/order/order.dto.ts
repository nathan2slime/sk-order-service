import { IsEnum, ValidateNested } from 'class-validator';

import { CreateOrderItemDto } from '~/app/order-item/order-item.dto';

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
}

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ValidateNested()
  itens: CreateOrderItemDto;
}
