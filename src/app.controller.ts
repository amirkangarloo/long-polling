import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMessageDto } from './dto';

@Controller({ path: 'message' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/:userId')
  async createMessage(
    @Body() body: CreateMessageDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.appService.createMessage(body, userId);
  }

  @Get('/:userId')
  async getMessage(@Param('userId', ParseIntPipe) userId: number) {
    return await this.appService.getMessage(userId);
  }
}
