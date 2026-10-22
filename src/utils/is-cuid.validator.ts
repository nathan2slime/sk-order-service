import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isCuid } from '@paralleldrive/cuid2';

@ValidatorConstraint({ name: 'isCuid', async: false })
export class IsCuid implements ValidatorConstraintInterface {
  validate(text: string) {
    return isCuid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid CUID`;
  }
}
