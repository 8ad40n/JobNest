import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}


    async register(data: any): Promise<User>
    {
        return this.userRepository.save(data);
    }

    async findOne(email: any): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email }
        });
    }

}
