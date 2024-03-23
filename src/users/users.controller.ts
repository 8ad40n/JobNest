import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Bill } from 'src/entities/bill.entitiy';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { editProfileDto } from './dto/edit_profile.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Bill) private readonly bilRepository: Repository<Bill>
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req):any{
    const userId = req.user.id;
    return this.usersService.getProfile(userId);

  }


  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  editProfile(@Body() edit_prfile_dto: editProfileDto, @Req() req):any{
    const userId = req.user.id;
    return this.usersService.editProfile(userId, edit_prfile_dto);
  }

  @Get('transaction')
  @UseGuards(JwtAuthGuard)
  getTransaction(@Req() req):any{
    const userId = req.user.id;
    return this.usersService.getTransaction(userId);

  }

  @Get('job')
  @UseGuards(JwtAuthGuard)
  getUserJobs(@Req() req):any{
    const userId = req.user.id;
    return this.usersService.getUserJobs(userId);
  }
}
