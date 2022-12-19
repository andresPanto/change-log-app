import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Project } from 'src/project/project.entity';
import { ProjectService } from 'src/project/project.service';
import { CreateUpdateDTO } from './dto/create-update.dto';
import { Update } from './update.entity';
import { UpdateService } from './update.service';

@Controller('update')
@UseGuards(AuthGuard())
export class UpdateController {
  constructor(
    private updateService: UpdateService,
    private projectService: ProjectService,
  ) {}

  @Post()
  async createUpdate(
    @Body() createUpdateDTO: CreateUpdateDTO,
  ): Promise<Update> {
    const projectID = createUpdateDTO.project;
    const project: Project = await this.projectService.getProjectByID(
      projectID,
    );
    return this.updateService.createUpdate(createUpdateDTO, project);
  }

  @Delete('/:id')
  async deleteUpdate(@Param('id') id: string): Promise<void> {
    return this.updateService.deleteUpdate(id);
  }
}
