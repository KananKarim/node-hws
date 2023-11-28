import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity.ts";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;
  @Column()
  authorId: number; 
  
  @ManyToOne(() => User)
  @JoinColumn({ name: "authorId" })
  author: User;
}