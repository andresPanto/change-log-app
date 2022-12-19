import { IsEnum } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class UpdateProjectStatusDTO {
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
