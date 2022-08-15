import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from './swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { AppConfig } from './config/config.constant';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const appConfig = app.get(ConfigService).get<AppConfig>('appConfig');
	const port = appConfig.listeningPort;

	setupSwagger(app);
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
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
