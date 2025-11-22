import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-item',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NavItemComponent {
  route = input.required<string>();
  label = input.required<string>();
  collapsed = input.required<boolean>();
  iconSvg = input<string>();

  constructor(private sanitizer: DomSanitizer) {}

  getSafeSvg(): SafeHtml | null {
    const svg = this.iconSvg();
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  }
}

