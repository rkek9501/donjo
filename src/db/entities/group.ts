import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm/browser';
import { Member } from './member';

@Entity("Group")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type: any) => Member, (member) => member.id)
  @JoinTable()
  members?: Member[];
}
