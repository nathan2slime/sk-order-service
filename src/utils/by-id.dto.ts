import { ApiSchema } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { IsCuid } from '~/utils/is-cuid.validator';

@ApiSchema({ description: 'DTO for fetching an item by ID' })
export class ByIdDto {
  @IsString()
  @Validate(IsCuid)
  id: string;
}
