import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../../auth/enums/role.enum.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 2 })
  country: string;

  @Column({ type: "varchar", length: 100 })
  city: string;

  @Column({ type: "varchar", length: 100 })
  address: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100, unique: true })
  phone_number: string;
}
