import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './sub-components/nav-item/nav-item.component';
import { INavItem } from './nav-item.model';
import { SIDEBAR_ITEMS_DATA } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SidebarComponent {
  collapsed = input.required<boolean>();
  toggle = output<void>();

  navItems = signal<INavItem[]>(SIDEBAR_ITEMS_DATA);

  onToggle(): void {
    this.toggle.emit();
  }
}

