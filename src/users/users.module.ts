import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "./users.model";
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}