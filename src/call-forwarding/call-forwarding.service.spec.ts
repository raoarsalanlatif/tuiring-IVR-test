import { Test, TestingModule } from '@nestjs/testing';
import { CallForwardingService } from './call-forwarding.service';

describe('CallForwardingService', () => {
  let service: CallForwardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallForwardingService],
    }).compile();

    service = module.get<CallForwardingService>(CallForwardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
