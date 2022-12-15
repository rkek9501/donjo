import {
  Entity,
  BaseEntity,
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
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  date!: Date;

  @Column()
  total!: number;

  @Column({ default: false })
  isSaved?: boolean;

  @Column({ default: false })
  isComplete?: boolean;

  @OneToMany(() => Group, (group) => group.id)
  @JoinTable()
  group?: Group;

  @OneToMany(() => Pay, (pay) => pay.id)
  @JoinTable()
  payList?: Pay[];
}
