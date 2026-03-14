import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  signal,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorSimulatorService } from '../../shared/services/http-error-simulator.service';
import { LogSeverity, LogsService } from '../../shared/services/logs.service';

@Component({
  selector: 'app-trazas-errores',
  imports: [CommonModule],
  templateUrl: './trazas-errores.component.html',
  styleUrl: './trazas-errores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TrazasErroresComponent implements OnInit {
  private readonly zone = inject(NgZone);
  private readonly errorSimulatorService = inject(HttpErrorSimulatorService);
  private readonly logsService = inject(LogsService);
  lastError = signal<any>(null);

  ngOnInit(): void {
    console.log('TrazasErroresComponent initialized');
    this.logsService.handleLogError(
      'ngOnInit success',
      'manual',
      LogSeverity.LOG
    );
    console.error('ñññññññññññññññññññ');
  }

  testErrorNull(): void {
    const a: any = [];
    console.log(a[1].prop);
  }

  testErrorThrow(): void {
    throw new Error('testErrorThrow');
  }

  testErrorThrowTimeout(): void {
    setTimeout(() => {
      throw new Error('testErrorThrowTimeout');
    }, 100);
  }

  testErrorZoneless(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        const a: any = [];
        console.log(a[1].prop);
      }, 100);
    });
  }

  testErrorPromise(): void {
    new Promise(() => {
      throw new Error('Error dentro de Promise');
    });
  }

  testErrorZonelessPromise(): void {
    this.zone.runOutsideAngular(() => {
      new Promise(() => {
        throw new Error('Error dentro de Promise');
      });
    });
  }

  // GET Requests
  testGet200(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getSuccess(),
      'GET 200'
    );
  }

  testGet400(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getError400(),
      'GET 400'
    );
  }
 testGet400_v1(): void {
    this.errorSimulatorService.getError400().subscribe();
  }

  testGet401(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getError401(),
      'GET 401'
    );
  }

  testGet403(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getError403(),
      'GET 403'
    );
  }

  testGet404(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getError404(),
      'GET 404'
    );
  }

  testGet500(): void {
    this.executeRequest(
      () => this.errorSimulatorService.getError500(),
      'GET 500'
    );
  }

  // POST Requests
  testPost200(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postSuccess(),
      'POST 200'
    );
  }

  testPost400(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postError400(),
      'POST 400'
    );
  }

  testPost401(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postError401(),
      'POST 401'
    );
  }

  testPost403(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postError403(),
      'POST 403'
    );
  }

  testPost404(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postError404(),
      'POST 404'
    );
  }

  testPost500(): void {
    this.executeRequest(
      () => this.errorSimulatorService.postError500(),
      'POST 500'
    );
  }

  private executeRequest(request: () => any, label: string): void {
    this.lastError.set(null);

    request().subscribe({
      next: (response: any) => {
        console.log('--- executeRequest Response:', response);
      },
      error: (error: any) => {
        this.lastError.set(error);
        console.error('--- executeRequest Error:', error);
      },
    });
  }
}
