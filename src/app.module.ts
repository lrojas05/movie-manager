import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/module/users.module';
import { FilmsModule } from './films/modules/films.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal : true,
      expandVariables: true,
    }
    ),
   // MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_NAME}`, {serverSelectionTimeoutMS: +process.env.MONGO_TIMEOUT}),
   MongooseModule.forRoot(`mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`, {serverSelectionTimeoutMS: +process.env.MONGO_TIMEOUT}),
   UsersModule,
    FilmsModule,
    ],
    providers:[AppService],
})
export class AppModule {}
