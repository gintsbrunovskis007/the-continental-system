import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity.js";
import { CreateUserDto } from "./Dto/create-user.dto.js";
import { UpdateUserDto } from "./Dto/update-user.dto.js";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      first_name: createUserDto.firstName,
      last_name: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
      date_of_birth: new Date(createUserDto.dateOfBirth),
      phone_number: createUserDto.phoneNumber,
    });

    const savedUser = await this.userRepository.save(user);

    const { password, ...result } = savedUser;

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.firstName !== undefined) {
      user.first_name = updateUserDto.firstName;
    }

    if (updateUserDto.lastName !== undefined) {
      user.last_name = updateUserDto.lastName;
    }

    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.dateOfBirth !== undefined) {
      user.date_of_birth = new Date(updateUserDto.dateOfBirth);
    }

    if (updateUserDto.phoneNumber !== undefined) {
      user.phone_number = updateUserDto.phoneNumber;
    }

    const savedUser = await this.userRepository.save(user);

    const { password, ...result } = savedUser;

    return result;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);

    return {
      message: `User with ID ${id} successfully deleted`,
    };
  }
}
