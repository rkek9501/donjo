import { ManyToMany, ManyToOne } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm/browser';
import { Group } from './group';
import { Member } from './member';
import { Dutch } from './dutch';

@Entity("Pay")
export class Pay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: string;

  @Column()
  date: Date;

  @Column()
  price: number;
  
  @ManyToOne((type: any) => Group, (group) => group.id)
  @JoinTable()
  group: Group;

  @OneToMany((type: any) => Dutch, (dutch) => dutch.id)
  @JoinTable()
  dutchPays?: Dutch[];
}
