import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException, Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = 3000;
    await app.listen(port);
    return port;
  } catch (error) {
    Logger.error(error);
    throw new InternalServerErrorException('Server error');
  }
}
bootstrap().then((port: number) => {
  Logger.log(`Server is listening on port ${port}`);
});

