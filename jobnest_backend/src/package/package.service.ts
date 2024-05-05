import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private readonly packageRepo:Repository<Package>
  ){}
  async create(createPackageDto: CreatePackageDto) {
    return await this.packageRepo.save(createPackageDto);
  }

  async findAll() {
    return await this.packageRepo.find();
  }

  async findOne(id: number) {
    return await this.packageRepo.findOneBy({id:id});
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.packageRepo.update(id, updatePackageDto);
  }

  async remove(id: number) {
    return await this.packageRepo.delete({id:id});
  }
}
