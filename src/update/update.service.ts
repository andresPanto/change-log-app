import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/project.entity';
import { Repository } from 'typeorm';
import { CreateUpdateDTO } from './dto/create-update.dto';
import { Update } from './update.entity';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(Update)
    private readonly updateRepositoroy: Repository<Update>,
  ) {}

  async createUpdate(
    createUpdateDTO: CreateUpdateDTO,
    project: Project,
  ): Promise<Update> {
    const { description } = createUpdateDTO;
    const update = this.updateRepositoroy.create({
      description,
      project,
    });

    await this.updateRepositoroy.save(update);

    return update;
  }

  async deleteUpdate(id: string): Promise<void> {
    const result = await this.updateRepositoroy.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
