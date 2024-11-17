import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto extends Product{
    @IsUUID("4")
    @IsOptional()
    productId: string;

    @ApiProperty({
        default: "Coca-cola"
    })
    @IsString()
    @MaxLength(50)
    productName: string;

    @ApiProperty({
        default: 30
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        default: 3
    })
    @IsNumber()
    @IsInt()
    countSeal: number;

    @IsString()
    provider: Provider | string;
}
