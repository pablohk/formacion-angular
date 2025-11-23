import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IDatosPersonales, Genero } from '../../../../shared/models/forms.model';

@Component({
  selector: 'app-formulario-two-binding',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-two-binding.component.html',
  styleUrl: './formulario-two-binding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FormularioTwoBindingComponent {
  public datos: IDatosPersonales = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    genero: '' as Genero,
    estadoCivil: undefined
  };

  public submittedData: IDatosPersonales | null = null;
  public fechaError: 'invalid' | 'future' | null = null;

  public generoOptions = [
    { value: '', label: 'Seleccione' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  get anyValueEntered(): boolean {
    const val = this.datos || {};
    return Object.values(val).some(v => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim() !== '';
      if (v instanceof Date) return !isNaN(v.getTime());
      return true;
    });
  }

  onSubmit(form?: NgForm): void {
    this.fechaError = null;

    // basic fecha validation
    const fv = this.datos.fechaNacimiento;
    if (!fv) {
      this.fechaError = 'invalid';
    } else {
      const fecha = new Date(fv as string);
      if (isNaN(fecha.getTime())) {
        this.fechaError = 'invalid';
      } else {
        const hoy = new Date();
        const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        if (fechaSinHora > hoySinHora) {
          this.fechaError = 'future';
        }
      }
    }

    if (form && form.invalid) {
      form.control.markAllAsTouched();
    }

    if (this.fechaError) return;
    if (form && form.invalid) return;

    // Good to submit
    this.submittedData = { ...this.datos };
    console.log('Datos enviados (two-binding):', this.submittedData);
  }

  resetForm(form?: NgForm): void {
    if (form) {
      form.resetForm();
    }
    this.datos = {
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      genero: '' as Genero,
      estadoCivil: undefined
    };
    this.submittedData = null;
    this.fechaError = null;
  }
}
