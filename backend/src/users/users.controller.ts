import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./Dto/create-user.dto.js";
import { UpdateUserDto } from "./Dto/update-user.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.usersService.delete(+id);
  }
}
