import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'post_tags',
    joinColumn: {
      name: 'post_id', // kolom di post_tags yang mengacu ke posts
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id', // kolom di post_tags yang mengacu ke tags
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
