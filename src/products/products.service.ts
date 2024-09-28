import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository : Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    const savedProduct = this.productRepository.save(createProductDto);
    return savedProduct;
  }

  findOne(productId: string) {
    const productFound = this.productRepository.findOneBy({
      productId: productId
    });
    if(!productFound) throw new NotFoundException(); 
    return productFound;
  }

  findAll() {
    return this.productRepository.find();
  }

  findByProvider(providerId: string){
    return this.productRepository.findBy({
      provider: {
        providerId : providerId
      }
    })
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.preload({
      productId: productId,
      ...updateProductDto
    })
    if (!updatedProduct) throw new NotFoundException()
    this.productRepository.save(updatedProduct)
    return updatedProduct
  }

  remove(productId: string) {
    this.productRepository.delete({
      productId: productId
    })
    return {
      message: `Objeto con id: ${productId} eliminado`
    }
  }
}
