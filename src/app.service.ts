import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CreateMessageDto } from './dto';
import { Response } from './interface';

@Injectable()
export class AppService {
  public async createMessage(
    body: CreateMessageDto,
    userId: number,
  ): Promise<string> {
    const redis = new Redis();
    const { forUserId, message } = body;
    const msg = {
      message,
      date: new Date(),
      fromUserId: userId,
    };
    const key = this.generateRedisKeyWithUserId(forUserId);
    await redis.rpush(key, JSON.stringify(msg));
    await redis.disconnect();
    return 'Message Sent!';
  }

  public async getMessage(userId: number): Promise<Response> {
    let response: Response;
    const redis = new Redis();
    const key = this.generateRedisKeyWithUserId(userId);
    const data = await redis.blpop([key], 5);
    await redis.disconnect();
    if (data) response = { statusCode: 200, payload: JSON.parse(data[1]) };
    else response = { statusCode: 404, payload: 'Timeout' };
    return response;
  }

  private generateRedisKeyWithUserId(userId: number): string {
    return `user_${userId}`;
  }
}
