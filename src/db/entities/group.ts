import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Member } from './member';

@Entity("Group")
export class Group {
  @PrimaryGeneratedColumn("increment")
  readonly id?: number;

  @Column()
  name!: string;
  
  @Column({ nullable: true })
  lastUsedDate?: Date;

  @ManyToMany(() => Member, (member) => member.groups, {
    // cascade: ["insert", "update"],
    onUpdate: "RESTRICT",
    onDelete: "SET NULL",
    nullable: true,
  })
  members?: Member[];
}
