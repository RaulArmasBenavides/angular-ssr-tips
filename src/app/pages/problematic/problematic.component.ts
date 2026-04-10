import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsProblematicComponent } from '../../components/cards-problematic/cards-problematic.component';

@Component({
  selector: 'app-problematic',
  standalone: true,
  imports: [CardsProblematicComponent, RouterLink],
  template: `
    <div class="container">
      <nav class="nav">
        <a routerLink="/">← Back to Home</a>
      </nav>

      <h1>Problematic Implementation</h1>
      <p class="description">
        This page demonstrates common performance issues in Angular applications.
        Open Chrome DevTools and run a Lighthouse audit to see the performance impact.
      </p>

      <app-cards-problematic></app-cards-problematic>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .nav {
      margin-bottom: 2rem;
    }
    .nav a {
      color: #4a5568;
      text-decoration: none;
    }
    .nav a:hover {
      text-decoration: underline;
    }
    .description {
      background-color: #fff5f5;
      border: 1px solid #feb2b2;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
  `]
})
export class ProblematicComponent {}
