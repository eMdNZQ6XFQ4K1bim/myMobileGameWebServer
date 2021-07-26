import { SetMetadata } from '@nestjs/common';

export const AuthTypes = (...authTypes: string[]) =>
  SetMetadata('authTypes', authTypes);