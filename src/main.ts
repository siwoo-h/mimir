import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import basicAuth from 'express-basic-auth';
import { AppModule } from '@src/app.module';
import { ServerConfig, SwaggerConfig } from '@src/common/config';
import { setupSwagger } from '@src/common/swagger/setup.swagger';

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

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
