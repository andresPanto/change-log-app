import { User } from '../auth/user.entity';
import { Update } from '../update/update.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.projects, { eager: true })
  user: User;

  @OneToMany(() => Update, (update) => update.project, { eager: true })
  updates: Update[];
}
