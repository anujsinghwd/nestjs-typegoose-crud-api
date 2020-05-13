import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { TypegooseModule } from "nestjs-typegoose";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true
    }),
    TypegooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule
  ],
})
export class AppModule {}