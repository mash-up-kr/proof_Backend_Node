import { Injectable } from '@nestjs/common';

@Injectable()
export class LambdaImageResizerService {
  getHello(): string {
    return 'Hello World!';
  }
}
