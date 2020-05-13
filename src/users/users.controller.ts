import { Controller, Get, Post, Body, Delete, Param} from "@nestjs/common";
import { UserService } from './users.service';
import { User } from "./users.model";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get')
  async getUsers(): Promise<User[] | null> {
    return await this.userService.listUsers();
  }

  @Post('/create')
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Delete('/delete/:id')
  async delete(@Param() id: string): Promise<any> {
    return await this.userService.delete({id});
  }

  @Post('/login')
  async login(@Body() user: {email: string, password: string}): Promise<User> {
    return await this.userService.login(user);
  }
}