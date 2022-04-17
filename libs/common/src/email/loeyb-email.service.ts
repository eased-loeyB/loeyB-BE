import { LOEYBConfigService } from '../config/loeyb-config.service';
import * as Mandrill from '@mailchimp/mailchimp_transactional/src';
import { Injectable, Logger } from '@nestjs/common';

import { Environment } from '../config/loeyb-config.service';

@Injectable()
export class LOEYBEmailService {
  constructor(private readonly config: LOEYBConfigService) {}

  async sendEmail(
    template: string,
    subject: string,
    recipients: string[],
    from?: { email?: string | null; name?: string },
  ) {
    Logger.debug(subject);
    Logger.debug(recipients);
    if (from == undefined) {
      from = {
        email: 'support@loeyb.ai',
        name: 'LOEYB',
      };
    }

    if (this.config.mandrillAPIKey == null) {
      throw new Error('Undefined Mandrill API Key');
    }
    const mandrill = Mandrill(this.config.mandrillAPIKey);
    mandrill.messages
      .send({
        message: {
          html: template,
          subject:
            this.config.nodeEnv == Environment.PRODUCTION
              ? subject
              : `[${this.config.nodeEnv}] ` + subject,
          from_email:
            from == undefined || from.email == undefined
              ? 'support@loeyb.ai'
              : from.email,
          from_name:
            from == undefined || from.name == undefined ? 'LOEYB' : from.name,
          to: recipients.map((email: string) => ({
            email: email,
            type: 'to',
          })),
        },
      })
      .then((response: any) => {
        Logger.debug(JSON.stringify(response));
      })
      .catch((e: any) => {
        Logger.error(e);
      });
  }
}
