import { Inject, Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

@Resolver('file')
export class FileResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'File';
}
