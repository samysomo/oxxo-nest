import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";

export class CreateProductDto {
    @IsUUID("4")
    productId: string;

    @IsString()
    @MaxLength(50)
    productName: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsInt()
    countSeal: number;

    @IsUUID("4")
    provider: string;
}
