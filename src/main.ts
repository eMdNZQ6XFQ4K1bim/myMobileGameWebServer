import { ValidationPipe } from '@nestjs/common';
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

  /**
   * 전역 범위 파이프라인 설정
   */
  app.useGlobalPipes(new ValidationPipe({
  	whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
    forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
    transform: true, // 요청에서 넘어온 자료들의 형변환
  }));

  await app.listen(3000);
}
bootstrap();
