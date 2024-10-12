import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProviderDto extends Provider{
    @ApiProperty({
        default: "Pepsico"
    })
    @IsString()
    @MaxLength(100)
    providerName: string;

    @ApiProperty({
        default: "pepsico@correo.com"
    })
    @IsEmail()
    @IsString()
    providerEmail: string;

    @ApiProperty({
        default: "12345678"
    })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}
