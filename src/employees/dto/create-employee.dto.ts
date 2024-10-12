import { IsEmail, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto extends Employee{
    
    @IsUUID()
    @IsOptional()
    employeeId: string;

    @ApiProperty({
        default: "Samuel"
    })
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    employeeName: string;

    @ApiProperty({
        default: "Serrato"
    })
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    employeeLastName: string;

    @ApiProperty({
        default: "12345678"
    })
    @ApiProperty()
    @IsString()
    @MaxLength(20)
    employeePhoneNumber: string;

    @ApiProperty({
        default: "sam@correo.com"
    })
    @ApiProperty()
    @IsEmail()
    employeeEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsObject()
    location: Location;
}


