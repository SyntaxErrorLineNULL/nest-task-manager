/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryTaskModule } from './modules/category-task/category-task.module';
import { MailModule } from './core/mail/mail.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { ArticleModule } from './modules/article/article.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    TaskModule,
    CategoryTaskModule,
    UserModule,
    AuthModule,
    MailModule,
    DatabaseModule,
    LoggerModule,
    ArticleModule,
    ImageModule,
  ],
})
export class AppModule {}
