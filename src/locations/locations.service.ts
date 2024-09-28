import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    private locationRepository : Repository<Location>
  ){}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId: id
    });
    if(!location) throw new NotFoundException()
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const updatedLocation = await this.locationRepository.preload({
      locationId : id,
      ...updateLocationDto
    });
    if(!updatedLocation) throw new NotFoundException()
    this.locationRepository.save(updatedLocation)
    return updatedLocation;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id
    })
  }
}
