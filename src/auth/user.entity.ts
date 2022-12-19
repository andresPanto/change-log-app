import { Exclude } from 'class-transformer';
import { Project } from '../project/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  username: string;
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Project, (project) => project.user, { eager: false })
  projects: Project[];
}
