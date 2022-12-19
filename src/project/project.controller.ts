import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { GetProjectFilterDTO } from './dto/get-project-filter.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getProjects(
    @Query() filterDTO: GetProjectFilterDTO,
    @Query() paginationDTO: PaginationDTO,
  ): Promise<Project[]> {
    return this.projectService.getProjects(filterDTO, paginationDTO);
  }

  @Get('/:id')
  async getProjectByID(@Param('id') id: string): Promise<Project> {
    return this.projectService.getProjectByID(id);
  }

  @Post()
  createProject(
    @Body() createProjectDTO: CreateProjectDTO,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDTO, user);
  }

  @Delete('/:id')
  deleteProjectByID(@Param('id') id: string) {
    return this.projectService.deleteProjectByID(id);
  }

  @Patch('/:id')
  updateProjectStatus(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDTO);
  }

  /*@Get()
  getProjects(@Query() filterDTO: GetProjectFilterDTO): Project[] {
    if (Object.keys(filterDTO).length) {
      return this.projectService.getProjectsWithFilter(filterDTO);
    } else {
      return this.projectService.getProjects();
    }
  }

  @Post()
  createProject(@Body() CreateProjectDTO: CreateProjectDTO): Project {
    return this.projectService.createProject(CreateProjectDTO);
  }

  @Get('/:id')
  getProjectByID(@Param('id') id: string): Project {
    return this.projectService.getProjectByID(id);
  }

  @Delete('/:id')
  deleteProjectByID(@Param('id') id: string) {
    return this.projectService.deleteProjectByID(id);
  }

  @Patch('/:id/status')
  updateProjectStatus(
    @Param('id') id: string,
    @Body() updateProjectStatusDTO: UpdateProjectStatusDTO,
  ): Project {
    const { status } = updateProjectStatusDTO;
    return this.projectService.updateProjectStatus(id, status);
  }*/
}
