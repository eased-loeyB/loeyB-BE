import { LOEYBConfigService } from '../config/loeyb-config.service';
import * as Mandrill from '@mailchimp/mailchimp_transactional/src';

import { LOEYBErrorCode } from '@libs/common/constant';
import { LOEYBException } from '@libs/common/model';
import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';
@Injectable()
export class LOEYBEmailService {
  constructor(private readonly config: LOEYBConfigService) {}

  // async sendEmail(
  //   template: string,
  //   subject: string,
  //   recipients: string[],
  //   from?: { email?: string | null; name?: string },
  // ) {
  //   Logger.debug(subject);
  //   Logger.debug(recipients);
  //   if (from == undefined) {
  //     from = {
  //       email: 'support@capa.ai',
  //       name: 'Eased',
  //     };
  //   }

  //   if (this.config.mandrillAPIKey == null) {
  //     throw new Error('Undefined Mandrill API Key');
  //   }
  //   const mandrill = Mandrill(this.config.mandrillAPIKey);
  //   mandrill.messages
  //     .send({
  //       message: {
  //         html: template,
  //         subject:
  //           this.config.nodeEnv == Environment.PRODUCTION
  //             ? subject
  //             : `[${this.config.nodeEnv}] ` + subject,
  //         from_email:
  //           from == undefined || from.email == undefined
  //             ? 'support@capa.ai'
  //             : from.email,
  //         from_name:
  //           from == undefined || from.name == undefined ? 'LOEYB' : from.name,
  //         to: recipients.map((email: string) => ({
  //           email: email,
  //           type: 'to',
  //         })),
  //       },
  //     })
  //     .then((response: any) => {
  //       Logger.debug(JSON.stringify(response));
  //     })
  //     .catch((e: any) => {
  //       Logger.error(e);
  //     });
  // }

  async sendEmail(
    subject: string,
    text: string,
    recipients: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({
          accessKeyId: this.config.awsAccessKey,
          secretAccessKey: this.config.awsSecretAccessKey,
          apiVersion: '2010-12-01',
          region: 'ap-northeast-2',
        }),
      });

      transporter.sendMail({
        from: 'support@loeyb.world',
        to: recipients,
        subject: subject,
        html: text,
      });
    } catch (error) {
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }
}
