import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UiStoreService } from './shared/store/ui/ui-store.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly uiStore = inject(UiStoreService);
  sidebarCollapsed = signal(false);
  public globalLoading = this.uiStore.getGlobalLoading();
  public showAdviseModal = this.uiStore.getShowAdviseModal();

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed: boolean) => !collapsed);
  }

  setGlobalLoading(isLoading: boolean): void {
    this.uiStore.setGlobalLoading(isLoading);
  }

  setShowAdviseModal(show: boolean): void {
    this.uiStore.setShowAdviseModal(show);
  }
}
