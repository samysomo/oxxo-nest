import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({
      providerId : id
    });
  }

  findByName(name: string){
    const provider = this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    })
    if(!provider) throw new NotFoundException()
    return provider
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.preload({
      providerId : id,
      ...updateProviderDto
    })
    return this.providerRepository.save(provider)
  }

  remove(id: string) {
    this.providerRepository.delete({
      providerId: id
    });
  }
}
