import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule 
} from '@angular/forms';

import { AsyncValidators } from './services/async-validator.service';

@Component({
  selector: 'app-formulario-complejo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-complejo.component.html',
  styleUrl: './formulario-complejo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class FormularioComplejoComponent {
  usuarioForm!: FormGroup;
  asyncValidators = inject(AsyncValidators);
  
  constructor(private fb: FormBuilder) {
   this.createFormGroup();
  }

  /**
   * Crear el FormGroup principal del formulario complejo
   */
  private createFormGroup(): void {
    this.usuarioForm = this.fb.group({
      datosPersonales: this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required]],
        fechaNacimiento: [
          '',
          [Validators.required, this.validarFechaNacimiento],
        ],
        genero: ['', Validators.required],
        estadoCivil: [''],
      }),

      datosLaborales: this.fb.array([this.crearDatosLaborales()]),

      datosContacto: this.fb.group({
        email: [
          '', 
          [Validators.required, Validators.email], 
          this.asyncValidators.emailUnico.bind(this.asyncValidators)
        ],
        telefono: ['', [Validators.required, this.validarTelefono]],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        codigoPostal: [''],
        pais: ['', Validators.required],
      }),

      datosAcademicos: this.fb.array([this.crearDatosAcademicos()]),
    });
  }

  // Métodos para crear grupos dinámicos
  crearDatosLaborales(): FormGroup {
    return this.fb.group({
      ocupacion: ['', Validators.required],
      empresa: [''],
      puesto: [''],
      experienciaLaboralAnios: [null, [Validators.min(0)]],
      salarioMensual: [null, [Validators.min(0)]],
    });
  }

  crearDatosAcademicos(): FormGroup {
    return this.fb.group({
      nivelEstudios: ['', Validators.required],
      institucion: ['', Validators.required],
      anioGraduacion: [null, [this.validarAnioGraduacion]],
      carrera: [''],
    });
  }

  // Custom Validators
  validarFechaNacimiento(control: AbstractControl): ValidationErrors | null {
    const valor = new Date(control.value);
    const hoy = new Date();
    if (valor > hoy) {
      return { fechaInvalida: 'La fecha no puede ser futura' };
    }
    return null;
  }

  validarTelefono(control: AbstractControl): ValidationErrors | null {
    const regex = /^[0-9]{9}$/; // ejemplo: 9 dígitos
    if (!regex.test(control.value)) {
      return { telefonoInvalido: 'El teléfono debe tener 9 dígitos' };
    }
    return null;
  }

  validarAnioGraduacion(control: AbstractControl): ValidationErrors | null {
    const anio = control.value;
    const actual = new Date().getFullYear();
    if (anio && (anio < 1950 || anio > actual)) {
      return { anioInvalido: 'El año de graduación no es válido' };
    }
    return null;
  }

  // Helpers para acceder a arrays
  get datosLaborales(): FormArray {
    return this.usuarioForm.get('datosLaborales') as FormArray;
  }

  get datosAcademicos(): FormArray {
    return this.usuarioForm.get('datosAcademicos') as FormArray;
  }

  agregarLaboral() {
    this.datosLaborales.push(this.crearDatosLaborales());
  }

  agregarAcademico() {
    this.datosAcademicos.push(this.crearDatosAcademicos());
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      console.log('Formulario válido:', this.usuarioForm.value);
    } else {
      console.log('Formulario inválido', this.usuarioForm);
    }
    
  }
}
