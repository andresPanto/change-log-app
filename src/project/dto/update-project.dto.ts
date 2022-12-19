import { IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class UpdateProjectDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
