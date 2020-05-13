export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly permissions?: string[];
    readonly isActive?: boolean;
    readonly accessToken?: string;
    readonly refreshToken?: string;
}