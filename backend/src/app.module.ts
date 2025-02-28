// import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MulterModule } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { JwtModule } from '@nestjs/jwt';
// import { secret } from './utils/constants';
// import { join } from 'path';
// import { VideoController } from './controller/video.controller';
// import { VideoService } from './service/video.service';
// import { UserService } from './service/user.service';
// import { UserController } from './controller/user.controller';
// import { Video, VideoSchema } from './model/video.schema';
// import { User, UserSchema } from './model/user.schema';
// import { isAuthenticated } from './app.middleware';

// @Module({
//   imports: [
//      MongooseModule.forRoot('mongodb+srv://debanjanrick04:n6RRR6H7XuXaRleX@cluster0.iy5tpdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,}),
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),

//      MulterModule.register({
//        storage: diskStorage({
//          destination: './public',
//          filename: (req, file, cb) => {
//            const ext = file.mimetype.split('/')[1];
//            cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
//          },
//        })
//      }),
//      JwtModule.register({
//       secret,
//       signOptions: { expiresIn: '2h' },
//     }),
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'public'),
//     }),
//   ],
 
// controllers: [AppController, VideoController, UserController],
// providers: [AppService, VideoService, UserService],
// })

// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(isAuthenticated)
//       .exclude(
//         { path: 'api/v1/video/:id', method: RequestMethod.GET }
//       )
//       .forRoutes(VideoController);
//   }
// }
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Video, VideoSchema } from './model/video.schema';
import { User, UserSchema } from './model/user.schema';
import { isAuthenticated } from './app.middleware';
import { secret } from './utils/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://debanjanrick04:n6RRR6H7XuXaRleX@cluster0.iy5tpdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),

    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, VideoController, UserController],
  providers: [AppService, VideoService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'api/v1/user/signup', method: RequestMethod.POST },
        { path: 'api/v1/user/signin', method: RequestMethod.POST }
      )
      .forRoutes(VideoController);
  }
}
