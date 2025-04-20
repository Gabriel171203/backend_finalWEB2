import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,

  ManyToMany,
  JoinTable
} from 'typeorm';
import { Posts } from '../post/posts.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
