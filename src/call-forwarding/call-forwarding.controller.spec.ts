import { Test, TestingModule } from '@nestjs/testing';
import { CallForwardingController } from './call-forwarding.controller';

describe('CallForwardingController', () => {
  let controller: CallForwardingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallForwardingController],
    }).compile();

    controller = module.get<CallForwardingController>(CallForwardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
