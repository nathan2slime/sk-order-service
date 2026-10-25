import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNumber,
  IsPositive,
  Validate,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { IsCuid } from "~/utils/is-cuid.validator";

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({ type: "number" })
  quantity: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: "number" })
  price: number;

  @Validate(IsCuid)
  @ApiProperty({ type: "string" })
  skuId: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: "List of items associated with the order.",
    type: [CreateOrderItemDto],
    example: [
      {
        quantity: 2,
        price: 23,
        skuId: "cmvn7uxvv0000356qpod27ayn",
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  itens: CreateOrderItemDto[];
}
