import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { LOEYBConfigService } from '../../../../libs/common/src/config/loeyb-config.service';
import { AUTHENTICATION } from '../../../../libs/common/src/constant';

const AUTHENTICATION_FACTORY = {
  provide: 'AUTHENTICATION_SERVICE',
  useFactory: (config: LOEYBConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqps://rabbitmq:loeyb4ever!!@b-66cdea29-d2a6-476b-a809-9a6f81bf543e.mq.ap-northeast-2.amazonaws.com:5671`,
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
