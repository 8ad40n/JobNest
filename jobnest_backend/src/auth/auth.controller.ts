import { BadRequestException, Body, Controller, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private jwtService: JwtService ) {}


    @Post("register")
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto)
    {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        return this.authService.register(createUserDto);
    }

    //@UseGuards(LocalGuard)
    @Post('login')
    async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response, @Req() req: Request
    ) {
    const user = await this.authService.findEmail(email);

    if (!user) {
        throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie("jwt", jwt, { httpOnly: true });

    return { message: 'Login successful', jwt };
}




    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        };
    }

    
}

