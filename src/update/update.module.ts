import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UpdateController } from './update.controller';
import { Update } from './update.entity';
import { PassportModule } from '@nestjs/passport';
import { UpdateService } from './update.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Update]),
    AuthModule,
    ProjectModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UpdateController],
  providers: [UpdateService],
  exports: [UpdateService],
})
export class UpdateModule {}
