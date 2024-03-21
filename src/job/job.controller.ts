import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Job } from 'src/entities/job.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JobPostDto } from './dto/jobPost.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService, 
        @InjectRepository(User) private readonly userRepository: Repository<User>, 
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>
    ) {}
    
    @UsePipes()
    @UseGuards(JwtAuthGuard)
    @Post("post")
    async jobPost(@Body() jobPostDto: JobPostDto, @Req() req) {
        jobPostDto.postedBy = req.user.id;
        return this.jobService.jobPost(jobPostDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("user")
    async user(@Req() req) {
        const postBy = req.user.id;
        return this.userRepository.find({ where: { id: postBy } });
    }

    @UseGuards(JwtAuthGuard)
    @Post("search")
    async searchJobsByTitle(@Body() searchQuery: { keyword: string }): Promise<Job[]> {
        const { keyword } = searchQuery;
        return this.jobService.searchJobsByTitle(keyword);
    }
}
