import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JobPostDto } from 'src/job/dto/jobPost.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @UseGuards(JwtAuthGuard)
    @Get("type")
    async types(@Req() req) {
        return await this.adminService.typeUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("users")
    async allUser(@Req() req) {
        return await this.adminService.allUser(req.user.id);
    }
  
  
  @UseGuards(JwtAuthGuard)
  @Post("jobPost")
  async addJob(@Body() jobPostDto: JobPostDto, @Req() req) {
    jobPostDto.postedBy = req.user.id;
    return this.adminService.jobPost(jobPostDto, req.user.id);
  }

   @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete('removeJobs/:id')
    async removeJob(@Param('id') jobId: number, @Req() req) {
        return await this.adminService.removeJob(jobId, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('removeUsers/:id')
    async removeUser(@Param('id') userId: number , @Req() req) {
        return await this.adminService.removeUser(userId, req.user.id);
    }

    
}
