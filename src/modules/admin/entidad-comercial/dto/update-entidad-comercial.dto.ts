import { PartialType } from '@nestjs/mapped-types';
import { CreateEntidadComercialDto } from './create-entidad-comercial.dto';

export class UpdateEntidadComercialDto extends PartialType(CreateEntidadComercialDto) {}
