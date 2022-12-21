import { ManyToMany, ManyToOne } from 'typeorm';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm';
import { Group } from './group';
import { Member } from './member';
import { Dutch } from './dutch';

@Entity("Pay")
export class Pay {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  place?: string;

  @Column()
  date!: Date;

  @Column()
  price!: number;
  
  @ManyToOne(() => Group, (group) => group.id)
  @JoinTable()
  group?: Group;

  @OneToMany(() => Dutch, (dutch) => dutch.id)
  @JoinTable()
  dutchPays?: Dutch[];
}
