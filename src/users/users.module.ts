import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "./users.model";
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}