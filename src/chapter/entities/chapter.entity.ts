import { NovelEntity } from 'src/novel/entities/novel.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OutputBlockData } from '../types/chapter';

@Entity('chapters')
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'json', nullable: true })
  body: OutputBlockData[];

  @Column()
  authorId: number;
  @Column()
  novelId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  author: UserEntity;
  @ManyToOne(() => NovelEntity, { eager: true })
  novel: NovelEntity;

  @Column({ default: 'edit' })
  status: string;

  //   @Column()
  //   rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
