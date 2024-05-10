import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:3000",
    credentials:true
  });

  const options = new DocumentBuilder()
    .setTitle('JobNest')
    .setDescription('')
    .setVersion('7.1.8')
    .addBearerAuth() 
    .addTag('api')
    .build();

    
  const document = SwaggerModule.createDocument(app, options);


  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(8000);
}


bootstrap();
