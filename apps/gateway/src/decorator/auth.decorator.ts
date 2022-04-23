import { applyDecorators, UseGuards } from '@nestjs/common';

import { LOEYBAuthGuard } from '../guard';

export function LoeybAuth() {
  return applyDecorators(UseGuards(LOEYBAuthGuard));
}
