import { Test, TestingModule } from '@nestjs/testing';
import { LambdaImageResizerController } from './lambda-image-resizer.controller';
import { LambdaImageResizerService } from './lambda-image-resizer.service';

describe('LambdaImageResizerController', () => {
  let lambdaImageResizerController: LambdaImageResizerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LambdaImageResizerController],
      providers: [LambdaImageResizerService],
    }).compile();

    lambdaImageResizerController = app.get<LambdaImageResizerController>(LambdaImageResizerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(lambdaImageResizerController.getHello()).toBe('Hello World!');
    });
  });
});
