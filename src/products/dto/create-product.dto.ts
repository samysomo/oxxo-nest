import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";


export class CreateProductDto extends Product{
    @IsUUID("4")
    @IsOptional()
    productId: string;

    @IsString()
    @MaxLength(50)
    productName: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsInt()
    countSeal: number;

    @IsString()
    @IsUUID("4")
    provider: Provider;
}
