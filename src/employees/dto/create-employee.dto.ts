import { IsEmail, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsString()
    @MaxLength(20)
    phoneNumber: string;

    @IsEmail()
    email: string;
}
