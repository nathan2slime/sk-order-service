import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

import { AppModule } from './app.module';
import { AppConfig } from '~/config/configuration';
import { AllExceptionFilter } from '~/filters/all-exception.filter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');

  const config = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const PORT = config.get<number>('PORT');

  const docs = new DocumentBuilder().setTitle('Order Service').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('/api/docs', app, documentFactory);
  app.use(
    '/api/scalar',
    apiReference({
      content: documentFactory(),
    }),
  );

  await app.listen(PORT);

  if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
    import.meta.webpackHot.dispose(() => void app.close());
  }
};

void bootstrap();
