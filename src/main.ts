import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { AppModule } from '@src/app.module';
import { ServerConfig, SwaggerConfig } from '@src/common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.get<ServerConfig>('server');
  const { username, password } = configService.get<SwaggerConfig>('swagger');

  app.use(
    ['/docs'],
    basicAuth({
      users: { [username]: password },
      challenge: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('MIMIR')
    .setDescription('The mimir API description')
    .setVersion('1.0')
    .addTag('mimir')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
