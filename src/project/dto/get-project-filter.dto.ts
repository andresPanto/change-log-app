import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class GetProjectFilterDTO {
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  createdAt?: Date;
}
