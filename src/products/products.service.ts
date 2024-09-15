import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';


@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas adobadas",
      price: 25,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca-Cola 600ml",
      price: 35,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua ciel 1l",
      price: 15,
      countSeal: 0,
      provider: uuid(),
    },
  ]

  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    createProductDto.provider = uuid();
    this.products.push(createProductDto);
    return this.products;
  }

  findOne(productId: string) {
    const productFound = this.products.filter((product) => product.productId === productId)[0];
    if(!productFound) throw new NotFoundException(); 
    return productFound;
  }

  findAll() {
    return this.products;
  }

  findByProvider(provider: string){
    const product = this.products.filter((product) => product.provider === provider);
    if(product.length === 0) throw new NotFoundException(); 
    return product;
  }

  update(productId: string, updateProductDto: UpdateProductDto) {
    let updatedProduct = this.findOne(productId)
    updatedProduct = {
      ...updatedProduct,
      ...updateProductDto,
      
    }
    
    this.products = this.products.map((product) => {
      if (product.productId === productId){
        product = updatedProduct
      return product
      }
    });

    return updatedProduct
  }

  remove(productId: string) {
    this.findOne(productId);
    this.products = this.products.filter((product) => product.productId !== productId);
    return this.products; 
  }
}
