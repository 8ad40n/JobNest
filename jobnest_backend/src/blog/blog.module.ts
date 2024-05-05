
import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { User } from 'src/entities/user.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';


@Module({
    controllers:[BlogController],
    imports:[TypeOrmModule.forFeature([Blog,User])],
    providers:[BlogService],
})
export class BlogModule {

}
