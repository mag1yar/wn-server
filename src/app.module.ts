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
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'admin',
      // database: 'worldnovels',
      host: 'eu-cdbr-west-02.cleardb.net',
      port: 3306,
      username: 'b82fe6c700bfb0',
      password: 'd21ce047',
      database: 'heroku_4c21b243cdd0e05',
      entities: [UserEntity, NovelEntity, CommentEntity, ChapterEntity],
      synchronize: false,
      migrationsRun: false,
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
