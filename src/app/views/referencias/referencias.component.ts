import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule],
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class ReferenciasComponent {
  protected readonly referenciasUrl: Array<string> = [
    'https://angular.dev/guide/di/defining-dependency-providers',
    'https://www.paradigmadigital.com/dev/patron-contenedor-presentadores-aplicado-desarrollo-angular/'
  ];

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Devuelve un `SafeUrl` para enlazar de forma segura en la plantilla.
   * Usamos `bypassSecurityTrustUrl` porque la URL proviene de una fuente
   * controlada en este ejemplo; si las URLs vienen de usuarios externos
   * habría que validarlas previamente (scheme, host, etc.).
   */
  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
