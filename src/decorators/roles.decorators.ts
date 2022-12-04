import { SetMetadata } from '@nestjs/common';

export const Roles = (expectedRoles: string) => SetMetadata('expectedRoles', expectedRoles);