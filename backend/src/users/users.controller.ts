import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./Dto/create-user.dto.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
