// async-validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuarioService } from './complex-form.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AsyncValidators {
  constructor(private usuarioService: UsuarioService) {}

  emailUnico(control: AbstractControl) {
    return this.usuarioService
      .verificarEmail(control.value)
      .pipe(map((existe) => (existe ? { emailExiste: true } : null)));
  }
}
