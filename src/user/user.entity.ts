import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dream } from '../dream/dream.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 25,
    unique: true,
  })
  username: string;

  @Column()
  password: string;
}
