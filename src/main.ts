import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/');
  app.enableCors({
    origin: [`http://localhost:3000`]
  })
  const swagger = new DocumentBuilder()
    .setTitle('Dashboard Api')
    .setDescription('Dashboard')
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(4000);
}
bootstrap();
