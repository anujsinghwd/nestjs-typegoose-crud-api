import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly permissions?: string[];

    @ApiProperty()
    readonly isActive?: boolean;

    @ApiProperty()
    readonly accessToken?: string;

    @ApiProperty()
    readonly refreshToken?: string;
}