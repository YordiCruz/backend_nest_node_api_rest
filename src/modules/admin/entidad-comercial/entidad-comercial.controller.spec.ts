import { Test, TestingModule } from '@nestjs/testing';
import { EntidadComercialController } from './entidad-comercial.controller';
import { EntidadComercialService } from './entidad-comercial.service';

describe('EntidadComercialController', () => {
  let controller: EntidadComercialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadComercialController],
      providers: [EntidadComercialService],
    }).compile();

    controller = module.get<EntidadComercialController>(EntidadComercialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
