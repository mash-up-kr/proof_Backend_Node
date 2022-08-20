import { NestFactory } from '@nestjs/core';
import { LambdaImageResizerModule } from './lambda-image-resizer.module';

async function bootstrap() {
  const app = await NestFactory.create(LambdaImageResizerModule);
  await app.listen(3000);
}
bootstrap();
