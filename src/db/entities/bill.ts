import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm/browser';
import { Pay } from './pay';
import { Group } from './group';
import { Dutch } from './dutch';

@Entity("Bill")
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  total: number;

  @Column({ default: false })
  isSaved: boolean;

  @Column({ default: false })
  isComplete: boolean;

  @OneToOne((type: any) => Group, (group) => group.id)
  @JoinTable()
  group: Group;

  @OneToMany((type: any) => Pay, (pay) => pay.id)
  @JoinTable()
  payList: Pay[];
}
