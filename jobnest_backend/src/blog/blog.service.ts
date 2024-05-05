import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';


import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepository:Repository<Blog>,
  @InjectRepository(User) private userRepository:Repository<User>){}
    /*getAllQuiz()
    {
        return [1,2,3,'From the service']
    }*/
    async createNewQuiz(quiz: any, user: number): Promise<Blog> {
      quiz.AuthorID = user;
    
      return this.blogRepository.save(quiz);
    }
    

    async showBlog()
    {
      return await this.blogRepository.find();

    }
    
}
