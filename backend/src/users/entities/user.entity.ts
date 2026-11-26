import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../../auth/enums/role.enum.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ type: "varchar", length: 100 })
  first_name: string;

  @Column({ type: "varchar", length: 100 })
  last_name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "date" })
  date_of_birth: Date;

  @Column({ type: "varchar", length: 100, unique: true })
  phone_number: string;
}
