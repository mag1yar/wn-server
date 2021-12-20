import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('novels')
export class NovelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ type: 'longtext' })
  description: string;
  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'simple-array', nullable: true })
  genres?: string[];
  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @Column({ nullable: true })
  chapters?: number;
  @Column()
  country: string;

  @Column()
  authorId: number;
  @ManyToOne(() => UserEntity, { eager: true })
  author: UserEntity;

  @Column({ nullable: true })
  illustrator?: string;
  @Column({ nullable: true })
  publishingHouse?: string;
  @Column({ nullable: true })
  releaseYear: string;
  @Column({ default: 'ongoing' })
  status: string;
  @Column()
  ageRating: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
