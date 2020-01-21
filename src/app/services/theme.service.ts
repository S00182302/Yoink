import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  enableDarkmode() {
    this.renderer.addClass(this.doc.body, 'dark-theme');
    this.renderer.removeClass(this.doc.body, 'light-theme');
  }

  enableLightmode() {
    this.renderer.removeClass(this.doc.body, 'dark-theme');
    this.renderer.addClass(this.doc.body, 'light-theme');
  }

  enableBasicTheme() {
    this.renderer.removeClass(this.doc.body, 'dark-theme');
    this.renderer.addClass(this.doc.body, 'basic-theme');
  }
}
