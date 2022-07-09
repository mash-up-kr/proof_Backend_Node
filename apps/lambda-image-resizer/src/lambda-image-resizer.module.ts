import { Module } from '@nestjs/common';
import { LambdaImageResizerController } from './lambda-image-resizer.controller';
import { LambdaImageResizerService } from './lambda-image-resizer.service';

@Module({
  imports: [],
  controllers: [LambdaImageResizerController],
  providers: [LambdaImageResizerService],
})
export class LambdaImageResizerModule {}
