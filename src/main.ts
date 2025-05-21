import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.useGlobalPipes( new ValidationPipe({
  transform:true,
  forbidNonWhitelisted:true
 }))
  const config = new DocumentBuilder()
    .setTitle('Task Manager')
    .setDescription('Apis description')
    .setVersion('1.0')
    .addTag('Task')
    .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();

