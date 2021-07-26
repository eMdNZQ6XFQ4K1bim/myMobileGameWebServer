import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger 사용 설정
   */
  if (process.env.SWAGGER_ENABLED === 'true') {
    const swaggerConfigs = new DocumentBuilder()
      .setTitle('my mobile web server API')
      .setDescription('The my mobile web server API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfigs);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
