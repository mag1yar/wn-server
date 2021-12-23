import { UserEntity } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NovelModule } from './novel/novel.module';
import { NovelEntity } from './novel/entities/novel.entity';
import { CommentModule } from './comment/comment.module';
import { CommentEntity } from './comment/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChapterModule } from './chapter/chapter.module';
import * as path from 'path';
import { ChapterEntity } from './chapter/entities/chapter.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from 'config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        entities: [UserEntity, NovelEntity, CommentEntity, ChapterEntity],
        synchronize: configService.get('database.synchronize'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    NovelModule,
    CommentModule,
    AuthModule,
    FileModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
