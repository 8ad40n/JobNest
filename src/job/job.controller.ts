import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JobPostDto } from './dto/jobPost.dto';
import { JobProposalDto } from './dto/jobProposal.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService, 
        @InjectRepository(User) private readonly userRepository: Repository<User>, 
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
        @InjectRepository(JobProposal) private readonly jobProposalRepository: Repository<JobProposal>
    ) {}
    

    @ApiBearerAuth('jwt')
    // Job Post
    @UsePipes()
    @UseGuards(JwtAuthGuard)
    @Post("post")
    async jobPost(@Body() jobPostDto: JobPostDto, @Req() req) {
        jobPostDto.postedBy = req.user.id;
        return this.jobService.jobPost(jobPostDto);
    }
    
    // User info
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Get("user")
    async user(@Req() req) {
        const postBy = req.user.id;
        return this.userRepository.find({ where: { id: postBy } });
    }


    // Job Search
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Post("search")
    async searchJobsByTitle(@Body() searchQuery: { keyword: string }): Promise<Job[]> {
        const { keyword } = searchQuery;
        return this.jobService.searchJobsByTitle(keyword);
    }


    // Send job proposal
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Post("proposal")
    async sendJobProposal(@Body() proposalDto: JobProposalDto, @Req() req): Promise<JobProposal> {
        try{
            const jobID= proposalDto.jobID;
        const job = await this.jobRepository.findOne({where: {jobID: jobID}});
        if (!job) {
            throw new Error("Job not found");
        }

        if (job.postedBy === req.user.id) {
            throw new Error("You cannot send a proposal for your own job");
        }

        proposalDto.userID = req.user.id;
        return this.jobService.createJobProposal(proposalDto); 
        }
        catch(error)
        {
            throw new Error(error.message);
        }
    }

    // see posted jobs
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Get('postedJobs')
    async getJobsByUser(@Req() req): Promise<Job[]> {
        const userId = req.user.id;
        return this.jobService.getPostedJobs(userId);
    }

    // see proposals
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Get(':jobId/proposals')
    async getJobProposals(@Param('jobId') jobId: number, @Req() req){
        const userID = req.user.id;
        return this.jobService.getJobProposals(jobId, userID);
    }



    //Accepted Proposal
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Post(':jobId/proposals/:proposalId/accept')
    async acceptJobProposal(@Param('jobId') jobId: number, @Param('proposalId') proposalId: number, @Req() req) {
        const loggedInUserId = req.user.id;

        try {
            return await this.jobService.acceptJobProposal(jobId, proposalId, loggedInUserId);
        } catch (error) {
            throw new NotFoundException('Failed to accept job proposal');
        }
    }




    // interest based job matching
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Get('interest-based')
    async getInterestBasedJobs(@Req() req): Promise<Job[]> {
        const loggedInUserId = req.user.id;

        return this.jobService.getInterestBasedJobs(loggedInUserId);
    }



    
}
