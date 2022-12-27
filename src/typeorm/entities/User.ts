import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ReMyinder } from "./Remymind"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  displayName: string

  @OneToMany(() => ReMyinder, (reMyinder) => reMyinder.user)
  userId: ReMyinder[]
}
