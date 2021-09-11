/**
 * Author: SyntaxErrorLineNULL.
 */

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async send(
    email: string,
    message: string,
    viev: string,
    html: any,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        subject: message,
        template: viev,
        context: html,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
