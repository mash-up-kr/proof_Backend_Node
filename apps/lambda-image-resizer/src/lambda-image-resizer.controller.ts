import { Controller, Get } from '@nestjs/common';
import { LambdaImageResizerService } from './lambda-image-resizer.service';

@Controller()
export class LambdaImageResizerController {
  constructor(private readonly lambdaImageResizerService: LambdaImageResizerService) {}

  @Get()
  getHello(): string {
    return this.lambdaImageResizerService.getHello();
  }
}
