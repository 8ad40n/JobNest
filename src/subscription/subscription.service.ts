import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entities/package.entity';
import { Repository } from 'typeorm';
import { Subscription } from 'src/entities/subscription.entity';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(Package) private readonly packageRepo:Repository<Package>,
    @InjectRepository(Subscription) private readonly subscriptionRepo:Repository<Subscription>
  ){}

  async create(createSubscriptionDto: CreateSubscriptionDto, user_id: number) {
    let package_obj = await this.packageRepo.findOneBy({id: createSubscriptionDto.package_id})
    if(package_obj == null){
      throw new NotFoundException({message: "package not found"})
    }
    let  obj = new Subscription;
    const current_date = Date.now();
    obj.purchase_date = new Date(current_date);
    const expire_date = current_date + (package_obj.validity_time * 24 * 60 * 60 * 1000);
    obj.expire_date = new Date(expire_date);
    obj.package_id=createSubscriptionDto.package_id;
    obj.user_id = user_id;
    obj.subscription_type = package_obj.type;
    obj.subscription_status = "active";
    return await this.subscriptionRepo.save(obj)
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
