import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BracketsPipe } from '../../shared/pipes/brackets.pipe';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule, BracketsPipe],
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ReferenciasComponent {
  protected readonly referenciasUrl: Array<{ titulo: string, url: string }> = [
    { titulo: 'Angular 19', url: 'https://v19.angular.dev/overview' },
    { titulo: 'Dependency Injection', url: 'https://angular.dev/guide/di/defining-dependency-providers' },
    { titulo: 'Patrón Contenedor-Presentadores', url: 'https://www.paradigmadigital.com/dev/patron-contenedor-presentadores-aplicado-desarrollo-angular/' },
    { titulo: 'Arquitectura Hexagonal', url: 'https://softwarecrafters.io/react/arquitectura-hexagonal-frontend' },
    { titulo: 'Angular vs React Data Binding', url: 'https://www.linkedin.com/pulse/angular-vs-react-data-binding-explained-muhammed-akil-lcoqf/' },
    { titulo: 'Zood con Angular', url: 'https://www.youtube.com/watch?v=2Up1ulUn5NE' },
    { titulo: 'Nomenclatura diagramas Marbles RxJS', url: 'https://careers.edicomgroup.com/techblog/marble-diagrams-for-testing-rxjs-operators/' },
    { titulo: 'Marbles Operadores RXJS interactivo', url: 'https://rxjsmarbles.dev/combineLatest' },
    { titulo: 'Angular Jest and Neovim', url: 'https://konstantin-denerz.com/quickstart-angular-19-testing-with-jest-and-neovim/' },
    { titulo: 'Testing Angular', url: 'https://testing-angular.com/' },
    { titulo: 'TypeScript', url: 'https://mkosir.github.io/typescript-style-guide/' },
  ];

  constructor(private sanitizer: DomSanitizer) { }

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
