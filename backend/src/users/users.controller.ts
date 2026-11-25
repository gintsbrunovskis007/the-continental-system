import { Controller, Post, Body, Patch, Param } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./Dto/create-user.dto.js";
import { UpdateUserDto } from "./Dto/update-user.dto.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
