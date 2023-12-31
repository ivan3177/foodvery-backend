import type {
  MailerOptions,
  MailerOptionsFactory,
} from '@nestjs-modules/mailer';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export class MailerConfigService implements MailerOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT'),
        secure: false,
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      },
      defaults: {
        from: this.configService.get<string>('SMTP_FROM'),
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
