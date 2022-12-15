import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm/browser';
import { Group } from './group';

@Entity("Member")
export class Member {
  @PrimaryGeneratedColumn("increment")
  id?: number;
  
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  bank?: string | null;

  @Column({ nullable: true })
  account?: string | null;

  @Column({ nullable: true })
  lastUsedDate?: Date;

  @OneToMany(() => Group, (group) => group.members)
  @JoinColumn()
  groups?: Group[];
}
