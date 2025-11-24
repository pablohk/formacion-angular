import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { UiStoreService } from '../../shared/store/ui/ui-store.service';

@Component({
  selector: 'app-gestor-estado',
  imports: [CommonModule],
  templateUrl: './gestor-estado.component.html',
  styleUrls: ['./gestor-estado.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})  

export class GestorEstadoComponent {
  private readonly uiStore = inject(UiStoreService);

  public globalLoading = this.uiStore.getGlobalLoading();
  public globalError = this.uiStore.getGlobalError();
  public showAdviseModal = this.uiStore.getShowAdviseModal();

  setGlobalLoading(isLoading: boolean): void {
    this.uiStore.setGlobalLoading(isLoading);
  }

  setGlobalError(error: string | null): void {
    this.uiStore.setGlobalError(error);
  }

  setShowAdviseModal(show: boolean): void {
    this.uiStore.setShowAdviseModal(show);
  }
}
