import { Test, TestingModule } from '@nestjs/testing';
import { EntidadComercialService } from './entidad-comercial.service';

describe('EntidadComercialService', () => {
  let service: EntidadComercialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntidadComercialService],
    }).compile();

    service = module.get<EntidadComercialService>(EntidadComercialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
