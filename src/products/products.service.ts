import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { identity } from 'rxjs';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productReposiory : Repository<Product>
  ){}

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
    const savedProduct = this.productReposiory.save(createProductDto);
    return savedProduct;
  }

  findOne(productId: string) {
    const productFound = this.productReposiory.findOneBy({
      productId: productId
    });
    if(!productFound) throw new NotFoundException(); 
    return productFound;
  }

  findAll() {
    return this.productReposiory.find();
  }

  findByProvider(provider: string){
    const product = this.products.filter((product) => product.provider === provider);
    if(product.length === 0) throw new NotFoundException(); 
    return product;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productReposiory.preload({
      productId: productId,
      ...updateProductDto
    })
    if (!updatedProduct) throw new NotFoundException()
    this.productReposiory.save(updatedProduct)
    return updatedProduct
  }

  remove(productId: string) {
    this.productReposiory.delete({
      productId: productId
    })
    return {
      message: `Objeto con id: ${productId} eliminado`
    }
  }
}
