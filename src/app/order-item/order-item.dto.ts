import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, Validate } from 'class-validator';
import { IsCuid } from '~/utils/is-cuid.validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({ type: 'number' })
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @Validate(IsCuid)
  skuId: string;

  @Validate(IsCuid)
  orderId: string;
}
