import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.use(RequestLoggerMiddleware);
}
bootstrap();
