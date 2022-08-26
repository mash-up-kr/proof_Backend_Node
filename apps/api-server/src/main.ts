import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from './swagger';

import { AppModule } from './app.module';
import { AppConfig } from './config/config.constant';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggerConfigService } from './logger/logger-config.service';

declare const module: any;

async function bootstrap() {
	const logger = LoggerConfigService.getInstance().getLogger();
	const app = await NestFactory.create(AppModule, { logger: logger });
	const appConfig = app.get(ConfigService).get<AppConfig>('appConfig');
	const port = appConfig.listeningPort;
	app.enableCors({
		origin: appConfig.cors.origin,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	setupSwagger(app);

	app.useGlobalInterceptors(new LoggingInterceptor(logger));
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
