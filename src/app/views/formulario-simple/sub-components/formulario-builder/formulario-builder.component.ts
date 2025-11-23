import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IDatosPersonales } from '../../../../shared/models/forms.model';

@Component({
  selector: 'app-formulario-builder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-builder.component.html',
  styleUrl: './formulario-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FormularioBuilderComponent {
  public datosPersonalesForm: FormGroup;
  public submittedData: IDatosPersonales | null = null;

  public generoOptions = [
    { value: '', label: 'Seleccione' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  constructor(private fb: FormBuilder) {
    this.datosPersonalesForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
      genero: ['', [Validators.required]],
      estadoCivil: ['']
    });
  }

  get f() {
    return this.datosPersonalesForm.controls;
  }

  get anyValueEntered(): boolean {
    const val = this.datosPersonalesForm.value || {};
    return Object.values(val).some(v => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim() !== '';
      if (v instanceof Date) return !isNaN(v.getTime());
      return true;
    });
  }

  onSubmit(): void {
    if (this.datosPersonalesForm.invalid) {
      this.datosPersonalesForm.markAllAsTouched();
      return;
    }

    const raw = this.datosPersonalesForm.value;
    // transform fechaNacimiento to Date if possible
    const datos: IDatosPersonales = {
      nombre: raw.nombre,
      apellido: raw.apellido,
      fechaNacimiento: raw.fechaNacimiento,
      genero: raw.genero,
      estadoCivil: raw.estadoCivil || undefined
    };

    this.submittedData = datos;
    // Aquí podrías emitir el valor a un servicio o padre
    console.log('Datos personales enviados:', datos);
  }

  resetForm(): void {
    this.datosPersonalesForm.reset();
    this.submittedData = null;
  }
}

// validador simple que impide fechas futuras
function fechaNoFutura(control: AbstractControl): ValidationErrors | null {
  const val = control.value;
  if (!val) return null;
  const fecha = new Date(val);
  if (isNaN(fecha.getTime())) return { invalidDate: true };
  const hoy = new Date();
  // comparar solo fechas (sin hora)
  const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  if (fechaSinHora > hoySinHora) {
    return { futureDate: true };
  }
  return null;
}
