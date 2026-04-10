import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  constructor(private readonly router: Router) {
    if (environment.production) {
      this.setupAnalytics();
    }
  }

  private setupAnalytics(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', environment.googleAnalyticsId, {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
