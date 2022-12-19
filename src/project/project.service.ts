import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectStatus } from './project-status.enum';
import { CreateProjectDTO } from './dto/create-project.dto';
import { GetProjectFilterDTO } from './dto/get-project-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepositoroy: Repository<Project>,
  ) {}

  async getProjects(
    filterDTO: GetProjectFilterDTO,
    paginationDTO: PaginationDTO,
  ): Promise<Project[]> {
    const { status, search, username, createdAt } = filterDTO;
    let { take, page } = paginationDTO;

    const query = this.projectRepositoroy.createQueryBuilder('project');

    if (username) {
      query
        .leftJoinAndSelect('project.user', 'user')
        .where('user.username = :username', { username });
    }

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(project.title) LIKE LOWER(:search) OR LOWER(project.description) LIKE LOWER(:search))',
        { search },
      );
    }

    if (createdAt) {
      query.andWhere('project.createdAt = :createdAt', { createdAt });
    }

    if (!take) {
      take = 20;
    } else {
      take = take > 20 ? 20 : take;
    }

    if (!page) {
      page = 1;
    }

    const projects = query
      .take(take)
      .skip((page - 1) * take)
      .getMany();

    return projects;
  }

  async getProjectByID(id: string): Promise<Project> {
    const found = await this.projectRepositoroy.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createProject(
    createProjectDTO: CreateProjectDTO,
    user: User,
  ): Promise<Project> {
    const { title, description } = createProjectDTO;

    const project = this.projectRepositoroy.create({
      title,
      description,
      status: ProjectStatus.OPEN,
      user,
    });

    await this.projectRepositoroy.save(project);

    return project;
  }

  async deleteProjectByID(id: string): Promise<void> {
    const result = await this.projectRepositoroy.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
  ): Promise<Project> {
    const project = await this.getProjectByID(id);

    project.status = status;

    await this.projectRepositoroy.save(project);

    return project;
  }

  async updateProject(
    id: string,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project> {
    const { status, description, title } = updateProjectDTO;
    const project = await this.getProjectByID(id);

    if (status) {
      project.status = status;
    }

    if (description) {
      project.description = description;
    }

    if (title) {
      project.title = title;
    }

    await this.projectRepositoroy.save(project);

    return project;
  }
}
