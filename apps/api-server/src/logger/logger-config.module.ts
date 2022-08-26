import { Module } from '@nestjs/common';
import { LoggerConfigService } from './logger-config.service';

@Module({
	exports: [LoggerConfigService],
})
export class LoggerConfigModule {}
