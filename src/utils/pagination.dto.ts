import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@ApiSchema({ description: 'Pagination DTO' })
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    minimum: 1,
    type: 'number',
    example: 1,
    description: 'The page number',
  })
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiProperty({
    minimum: 1,
    maximum: 100,
    type: 'number',
    example: 20,
    description: 'The number of items per page',
  })
  limit = 20;
}
