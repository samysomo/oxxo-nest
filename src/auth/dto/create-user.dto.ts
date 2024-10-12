import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User{
    @ApiProperty({
        default: "user@email.com"
    })
    @IsEmail()
    userEmail: string;
    @ApiProperty({
        default: "12345678"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Admin", "Manager", "Employee"])
    userRoles: string[];
}
