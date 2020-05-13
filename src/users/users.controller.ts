import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request} from "@nestjs/common";
import { UserService } from './users.service';
import { User } from "./users.model";
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.serivce';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
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

  // @Post('/login')
  // async login(@Body() user: {email: string, password: string}): Promise<User> {
  //   return await this.userService.login(user);
  // }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: {email: string, password: string}) {
    console.log(user);
    return this.authService.login(user);
  }
}