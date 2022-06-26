import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToMany,
  // ManyToMany,
  // JoinTable,
} from 'typeorm/browser';
// import { Group } from './group';

@Entity("Member")
export class Member {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  bank?: string;

  @Column({ nullable: true })
  account?: string;

  // @ManyToMany((type: any) => Group, (group) => group.id)
  // @JoinTable()
  // groups: Group[];
}
