import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UsePipes(new ValidationPipe)
  create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Req() req) {
    const user_id: number = req.user.id;
    return this.subscriptionService.create(createSubscriptionDto, user_id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  get(@Req() req){
    const userId = req.user.id;
    return this.subscriptionService.getSubscriptionByUserId(userId);
  }
  

  // @Get()
  // findAll() {
  //   return this.subscriptionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subscriptionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
  //   return this.subscriptionService.update(+id, updateSubscriptionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscriptionService.remove(+id);
  // }
}
