import { comment, reaction } from 'src/types/message.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ type: 'text' })
  text: string;
  @Column({ type: 'jsonb', default: [] })
  comments: comment[];
  @Column({ type: 'jsonb', default: [] })
  reactions: reaction[];
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  user: User;
}
