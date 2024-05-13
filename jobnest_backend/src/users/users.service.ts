import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entitiy';
import { LessThanOrEqual, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { profileDto } from './dto/profile.dto';
import { editProfileDto } from './dto/edit_profile.dto';
import { Job } from 'src/entities/job.entity';
import { Subscription } from 'src/entities/subscription.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Bill) private readonly bilRepository: Repository<Bill>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Subscription) private readonly subscriptionRepo: Repository<Subscription>,
  ){}

  async editProfile(userId: number, editProfileDto: editProfileDto): Promise<any> {
    const exObj = await this.userRepository.findOneBy({id: userId});
    exObj.name = editProfileDto.name;
    exObj.email = editProfileDto.email;
    return await this.userRepository.update(userId, exObj);
  }

  async getProfile(userId: any): Promise<profileDto> {
    console.log(userId)
    // return this.userRepository.findBy(userId);
    const data = await this.userRepository.findOne({where:{
      id:userId
    }})
    const plainData = instanceToPlain(data);
    console.log(plainData);
    const classData = plainToInstance(profileDto, plainData, { excludeExtraneousValues: true });
    console.log(classData);

    const subscription_Data_count = await this.subscriptionRepo.count({where:{user_id:userId, expire_date: LessThanOrEqual(new Date())}});
    if(subscription_Data_count>0){
      classData.subscriptionStatus="Active";
    }

    return classData;
    // return data;
  }

  async getTransaction(userId: any): Promise<any> {
    return await this.bilRepository.find({
      where:[
        {sendUserId:userId},
        {recievedUserId:userId}
      ]
    })
  }
  
  
  getUserJobs(userId: any): any {
    return this.jobRepository.find({where:[
      {acceptedUserID:userId},
      {postedBy: userId}
    ]})
  }
}
