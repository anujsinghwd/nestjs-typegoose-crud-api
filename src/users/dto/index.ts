import { Exclude } from 'class-transformer';

export class CreateUserDto {
    readonly name: string;
    readonly email: string;

    @Exclude()
    readonly password: string;
    
    readonly permissions?: string[];
    readonly isActive?: boolean;
    readonly accessToken?: string;
    readonly refreshToken?: string;
}