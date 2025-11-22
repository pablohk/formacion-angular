export type Genero = 'masculino' | 'femenino' | 'otro' | '';

export interface DatosPersonales {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date | string;
  genero: Genero;
  estadoCivil?: string;
}

export interface DatosLaborales {
  ocupacion: string;
  empresa?: string;
  puesto?: string;
  experienciaLaboralAnios?: number;
  salarioMensual?: number;
}

export interface DatosContacto {
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal?: string;
  pais: string;
}

export interface DatosAcademicos {
  nivelEstudios: string;
  institucion: string;
  anioGraduacion?: number;
  carrera?: string;
}

export interface UsuarioFormulario {
  datosPersonales: DatosPersonales;
  datosLaborales: Array<DatosLaborales>;
  datosContacto: DatosContacto;
  datosAcademicos: Array<DatosAcademicos>;
}
