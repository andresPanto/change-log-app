import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UpdateModule } from './update/update.module';
import { CONSTANTS } from './enviroment/constants';

@Module({
  imports: [
    ProjectModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONSTANTS.DB.host,
      port: CONSTANTS.DB.port,
      username: CONSTANTS.DB.username,
      password: CONSTANTS.DB.password,
      database: CONSTANTS.DB.database,
      autoLoadEntities: CONSTANTS.DB.autoLoadEntitites,
      synchronize: CONSTANTS.DB.synchronize,
      entities: CONSTANTS.DB.entities,
    }),
    AuthModule,
    UpdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
