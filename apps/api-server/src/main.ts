import { AppConfig } from './config/config.constant';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const appConfig = app.get(ConfigService).get<AppConfig>('appConfig');
	const port = appConfig.listeningPort;

	setupSwagger(app);

	app.useGlobalPipes(
		new ValidationPipe({
			// 이상한 값이 우리의 validator에 도달하지 않게
			whitelist: true,
			forbidNonWhitelisted: true,
			// 받은 값을 원하는 타입으로 변환
			transform: true,
		}),
	);
	await app.listen(port);
	console.log(`==============listening on port ${port}!!!====================`);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
