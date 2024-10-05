import { IsEmail, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsUUID()
    @IsOptional()
    employeeId: string;

    @IsString()
    @MaxLength(50)
    employeeName: string;

    @IsString()
    @MaxLength(50)
    employeeLastName: string;

    @IsString()
    @MaxLength(20)
    employeePhoneNumber: string;

    @IsEmail()
    employeeEmail: string;
}
