import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { LOEYBConfigService } from 'configs/loeyb-config.service';
import { AUTHENTICATION } from '../../../../constants';

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

export { AUTHENTICATION_FACTORY };
