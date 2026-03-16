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
import {
  LogSeverity,
  LogsService,
  OriginError,
} from '../../shared/services/logs.service';

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
    this.logsService.handleLog({
      payload: 'ngOnInit success',
      severity: LogSeverity.LOG,
      originError: OriginError.$BM_MANUALLY_ERROR,
    });
    console.error('ñññññññññññññññññññ','5555','6666');
  }

  testErrorNull(): void {
    console.clear();
    const a: any = [];
    console.log(a[1].prop);
  }

  testErrorThrow(): void {
    console.clear();
    throw ('testErrorThrow');
  }

  testErrorThrowTimeout(): void {
    console.clear();
    setTimeout(() => {
      throw new Error('testErrorThrowTimeout');
    }, 100);
  }

  testErrorZoneless(): void {
    console.clear();
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        const a: any = [];
        console.log(a[1].prop);
      }, 100);
    });
  }

  testErrorPromise(): void {
    console.clear();
    new Promise(() => {
      throw new Error('Error dentro de Promise');
    });
  }

  testErrorZonelessPromise(): void {
    console.clear();
    this.zone.runOutsideAngular(() => {
      new Promise(() => {
        throw new Error('Error dentro de Promise');
      });
    });
  }

  // GET Requests
  testGet200(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getSuccess(),
      'GET 200',
    );
  }

  testGet400(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getError400(),
      'GET 400',
    );
  }

  testGet400_v1(): void {
    console.clear();
    this.errorSimulatorService.getError400().subscribe();
  }

  testGet400RXJS(): void {
    console.clear();
    this.errorSimulatorService.getError400RXJS().subscribe();
  }

  testGet400RXJS_v1(): void {
    console.clear(); 
     this.errorSimulatorService.getError400RXJS(true).subscribe();
  }

  testGet401(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getError401(),
      'GET 401',
    );
  }

  testGet403(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getError403(),
      'GET 403',
    );
  }

  testGet404(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getError404(),
      'GET 404',
    );
  }

  testGet500(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.getError500(),
      'GET 500',
    );
  }

  // POST Requests
  testPost200(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postSuccess(),
      'POST 200',
    );
  }

  testPost400(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postError400(),
      'POST 400',
    );
  }

  testPost401(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postError401(),
      'POST 401',
    );
  }

  testPost403(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postError403(),
      'POST 403',
    );
  }

  testPost404(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postError404(),
      'POST 404',
    );
  }

  testPost500(): void {
    console.clear();
    this.executeRequest(
      () => this.errorSimulatorService.postError500(),
      'POST 500',
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
        console.log('--- executeRequest Error:', error);
      },
    });
  }
}
