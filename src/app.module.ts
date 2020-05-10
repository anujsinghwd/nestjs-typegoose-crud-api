import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://auth_services:fleetrf1018@ds363038.mlab.com:63038/fr-auth-services", {
      useNewUrlParser: true,
    }),
    UserModule,
  ],
})
export class AppModule {}