export class CreateContactoDto{
    entidad_comercial_id: number
    nombre_completo: string
    rol_contacto?: string
    telefono_secundario?: string
    correo_secundario?: string
    observaciones?: string
}