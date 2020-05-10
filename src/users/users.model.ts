import { prop } from "@typegoose/typegoose";
import { IsString, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class User {
  @prop({ required: true, trim: true, minlength: 3})
  @IsString()
  name!: string;

  @prop({ required: true, unique: true, trim: true })
  @IsEmail()
  email!: string;

  @prop({ required: true, trim: true, minlength: 5})
  @IsString()
  password!: string;

  @prop()
  @IsString()
  @IsOptional()
  permissions?: string[];

  @prop({default: true})
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @prop({trim: true})
  @IsString()
  @IsOptional()
  accessToken?: string;

  @prop({trim: true})
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @prop({default: new Date()})
  @IsString()
  @IsOptional()
  timestamp?: Date;
}