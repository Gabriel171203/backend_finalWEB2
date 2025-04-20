import { Body, Controller, Post, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: LoginDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  // Tambahkan endpoint ini
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get current user profile',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 2 },
        username: { type: 'string', example: 'gabrielkeren12' },
        email: { type: 'string', example: 'gabrielhtgl@gmail.com' }
      }
    }
  })
  getProfile(@Request() req) {
    // Debug log untuk melihat isi req.user
    console.log('GET /api/auth/me - req.user:', req.user);
    // Pastikan req.user ada dan field lengkap
    if (!req.user || (!req.user.id && !req.user.sub) || !req.user.email) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return {
      id: req.user.id ?? req.user.sub, // gunakan id jika ada, jika tidak pakai sub
      username: req.user.username,
      email: req.user.email,
    };
  }
}
