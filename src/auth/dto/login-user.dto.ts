import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, MinLength} from "class-validator"

export class LoginUserDto{
    @ApiProperty({
        default: "user@email.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "12345678"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}