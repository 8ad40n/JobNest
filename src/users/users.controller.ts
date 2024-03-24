import { Body, Controller, Get, Patch, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Bill } from 'src/entities/bill.entitiy';
import { Repository } from 'typeorm';
import { editProfileDto } from './dto/edit_profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Bill) private readonly bilRepository: Repository<Bill>
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
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
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getTransaction(@Req() req):any{
    const userId = req.user.id;
    return this.usersService.getTransaction(userId);

  }

  @Get('job')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  getUserJobs(@Req() req):any{
    const userId = req.user.id;
    return this.usersService.getUserJobs(userId);
  }
}
