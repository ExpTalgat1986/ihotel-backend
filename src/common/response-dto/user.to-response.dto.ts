import { UserEntity } from '../entities/user.entity';

export const userToResponseDto = (user: UserEntity) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    iin: user.iin,
    phone_number: user.phone_number,
    created_at: user.created_at,
    role: user.role,
  };
};
