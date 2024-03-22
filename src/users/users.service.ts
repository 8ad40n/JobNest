import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entitiy';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { classToPlain, instanceToPlain, plainToClass, plainToClassFromExist, plainToInstance } from 'class-transformer';
import { profileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Bill) private readonly bilRepository: Repository<Bill>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

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
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
