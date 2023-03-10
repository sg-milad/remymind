import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./User"

@Entity({ name: "remymind" })
export class ReMyinder {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @Column({ type: "text" })
  title: string

  @Column({ type: "text" })
  description: string

  @Column({ default: null })
  img: string

  @Column({ default: null })
  voice: string

  @Column({ default: false })
  favorite: boolean

  @Column({ default: 1 })
  remindme: number

  // @Column()
  // reminded

  @CreateDateColumn()
  createDate: string

  @UpdateDateColumn()
  updateDate: string
}
