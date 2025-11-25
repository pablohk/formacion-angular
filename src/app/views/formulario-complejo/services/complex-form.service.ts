import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private emailsRegistrados = ['test@example.com', 'juan@correo.com', 'ddd@d.com'];

  verificarEmail(email: string) {
    // Simula llamada HTTP con retraso de 1s
    return of(this.emailsRegistrados.includes(email)).pipe(
      delay(1000),
      map(existe => existe)
    );
  }
}