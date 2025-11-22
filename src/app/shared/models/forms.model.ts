export type Genero = 'masculino' | 'femenino' | 'otro' | '';

export interface IDatosPersonales {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date | string;
  genero: Genero;
  estadoCivil?: string;
}

export interface IDatosLaborales {
  ocupacion: string;
  empresa?: string;
  puesto?: string;
  experienciaLaboralAnios?: number;
  salarioMensual?: number;
}

export interface IDatosContacto {
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal?: string;
  pais: string;
}

export interface IDatosAcademicos {
  nivelEstudios: string;
  institucion: string;
  anioGraduacion?: number;
  carrera?: string;
}

export interface IUsuarioFormulario {
  datosPersonales: IDatosPersonales;
  datosLaborales: Array<IDatosLaborales>;
  datosContacto: IDatosContacto;
  datosAcademicos: Array<IDatosAcademicos>;
}
