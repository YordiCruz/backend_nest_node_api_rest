import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntidadComercialService } from './entidad-comercial.service';
import { CreateEntidadComercialDto } from './dto/create-entidad-comercial.dto';
import { UpdateEntidadComercialDto } from './dto/update-entidad-comercial.dto';

@Controller('entidad-comercial')
export class EntidadComercialController {
  constructor(private readonly entidadComercialService: EntidadComercialService) {}

  @Post()
  create(@Body() createEntidadComercialDto: CreateEntidadComercialDto) {
    return this.entidadComercialService.create(createEntidadComercialDto);
  }

  @Get()
  findAll() {
    return this.entidadComercialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadComercialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntidadComercialDto: UpdateEntidadComercialDto) {
    return this.entidadComercialService.update(+id, updateEntidadComercialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadComercialService.remove(+id);
  }
}
