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
    'https://v19.angular.dev/overview',
    'https://angular.dev/guide/di/defining-dependency-providers',
    'https://www.paradigmadigital.com/dev/patron-contenedor-presentadores-aplicado-desarrollo-angular/',
    'https://www.linkedin.com/pulse/angular-vs-react-data-binding-explained-muhammed-akil-lcoqf/',
    'https://www.youtube.com/watch?v=2Up1ulUn5NE',
    'https://careers.edicomgroup.com/techblog/marble-diagrams-for-testing-rxjs-operators/',
    'https://rxjsmarbles.dev/combineLatest',
    'https://konstantin-denerz.com/quickstart-angular-19-testing-with-jest-and-neovim/'
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
