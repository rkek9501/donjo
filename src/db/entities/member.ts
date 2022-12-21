import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Group } from './group';

@Entity("Member")
export class Member {
  @PrimaryGeneratedColumn("increment")
  readonly id!: number;
  
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  bank?: string | null;

  @Column({ nullable: true })
  account?: string | null;

  @Column({ nullable: true })
  lastUsedDate?: Date;
 
  @ManyToMany(() => Group, (group) => group.members, {
    // cascade: ["insert", "update"],
    onUpdate: "RESTRICT",
    onDelete: "SET NULL",
    eager: false,
    nullable: true
  })
  @JoinTable({
    name: 'member_group',
    joinColumn: { name: 'member_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups?: Group[];
}
