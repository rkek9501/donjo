import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne
} from 'typeorm/browser';
import { Member } from './member';

@Entity("Group")
export class Group {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column()
  name!: string;
  
  @Column({ nullable: true })
  lastUsedDate?: Date;

  @ManyToOne(() => Member, (member) => member.groups)
  @JoinColumn()
  members?: Member[];
}
