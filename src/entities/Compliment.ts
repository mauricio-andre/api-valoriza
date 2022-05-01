import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Tag } from './Tags';
import { User } from './User';

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  userSenderId: string;

  @JoinColumn({ name: 'userSenderId' })
  @ManyToOne(() => User)
  userSender: User;

  @Column()
  userReceiverId: string;

  @JoinColumn({ name: 'userReceiverId' })
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tagId: string;

  @JoinColumn({ name: 'tagId' })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
