import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
class IsPhoneNumberExistsConstraint implements ValidatorConstraintInterface {
  validate(phone: string) {
    return UserEntity.count({ where: { phone_number: phone } }).then((value) => !!value);
  }
}

export function IsPhoneNumberExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberExistsConstraint,
    });
  };
}
