/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { MailModule } from './core/mail/mail.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { ArticleModule } from './modules/article/article.module';
import { FileModule } from './modules/file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.service';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    MulterModule.register(multerOptions),
    TaskModule,
    CategoryModule,
    UserModule,
    AuthModule,
    MailModule,
    DatabaseModule,
    LoggerModule,
    ArticleModule,
    FileModule,
    ChatModule,
  ],
})
export class AppModule {}
