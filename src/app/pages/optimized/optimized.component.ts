import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsOptimizedComponent } from '../../components/cards-optimized/cards-optimized.component';

@Component({
  selector: 'app-optimized',
  standalone: true,
  imports: [CardsOptimizedComponent, RouterLink],
  template: `
    <div class="container">
      <nav class="nav">
        <a routerLink="/">← Back to Home</a>
      </nav>

      <h1>Optimized Implementation</h1>
      <p class="description">
        This page demonstrates performance best practices in Angular applications.
        Run a Lighthouse audit and compare the results with the problematic version.
      </p>

      <app-cards-optimized></app-cards-optimized>
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
      background-color: #f0fff4;
      border: 1px solid #9ae6b4;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
  `]
})
export class OptimizedComponent {}
