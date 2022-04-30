import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { LOEYBConfigService } from '../../../../libs/common/src/config/loeyb-config.service';
import {
  AUTHENTICATION,
  FILE,
  STARDUST,
  NOTIFICATION,
} from '../../../../libs/common/src/constant';

const AUTHENTICATION_FACTORY = {
  provide: 'AUTHENTICATION_SERVICE',
  useFactory: (config: LOEYBConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `${config.rabbitmqProto}://${config.rabbitmqUser}:${config.rabbitmqPass}@${config.rabbitmqHost}:${config.rabbitmqPort}`,
        ],
        queue: AUTHENTICATION,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    }),
  inject: [LOEYBConfigService],
};

const STARDUST_FACTORY = {
  provide: 'STARDUST_SERVICE',
  useFactory: (config: LOEYBConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `${config.rabbitmqProto}://${config.rabbitmqUser}:${config.rabbitmqPass}@${config.rabbitmqHost}:${config.rabbitmqPort}`,
        ],
        queue: STARDUST,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    }),
  inject: [LOEYBConfigService],
};

const NOTIFICATION_FACTORY = {
  provide: 'NOTIFICATION_SERVICE',
  useFactory: (config: LOEYBConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `${config.rabbitmqProto}://${config.rabbitmqUser}:${config.rabbitmqPass}@${config.rabbitmqHost}:${config.rabbitmqPort}`,
        ],
        queue: NOTIFICATION,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    }),
  inject: [LOEYBConfigService],
};

const FILE_FACTORY = {
  provide: 'FILE_SERVICE',
  useFactory: (config: LOEYBConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `${config.rabbitmqProto}://${config.rabbitmqUser}:${config.rabbitmqPass}@${config.rabbitmqHost}:${config.rabbitmqPort}`,
        ],
        queue: FILE,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    }),
  inject: [LOEYBConfigService],
};
export {
  AUTHENTICATION_FACTORY,
  STARDUST_FACTORY,
  FILE_FACTORY,
  NOTIFICATION_FACTORY,
};
