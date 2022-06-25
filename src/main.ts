import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './swagger';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;

	setupSwagger(app);

	await app.listen(port);
	console.log(`==============listening on port ${port}!====================`);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
