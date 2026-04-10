import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step5-cls-issue',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 5: Layout Shift Issues</h1>
        <nav>
          <a routerLink="/step-4">← Previous</a>
          <a routerLink="/step-6" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          When images load without specified dimensions, they cause layout shifts as the browser
          doesn't know how much space to reserve. This affects the Cumulative Layout Shift (CLS) metric.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Content jumps as images load</li>
            <li>Poor user experience</li>
            <li>High CLS score (bad for Core Web Vitals)</li>
            <li>No image optimization</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
&lt;div class="card"&gt;
  &lt;img
    [src]="card.imageUrl"
    [alt]="card.title"
  &gt;
  &lt;h3&gt;{{ '{{' }} card.title {{ '}}' }}&lt;/h3&gt;
&lt;/div&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Watch how the layout shifts as images load. Try scrolling while images are loading
          to experience the poor user experience. Open DevTools Performance tab and look for layout shifts.
        </p>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <div class="card">
              <!-- Here -->
              <img
                [src]="card.imageUrl"
                [alt]="card.title"
              >
              <h3>{{ card.title }}</h3>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    nav a {
      margin-left: 1rem;
      text-decoration: none;
      color: #4a5568;
    }
    .next {
      background-color: #4a5568;
      color: white !important;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .explanation {
      background-color: #fff5f5;
      border: 1px solid #feb2b2;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .performance-impact {
      background-color: #fffaf0;
      border: 1px solid #fbd38d;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .code-example {
      background-color: #2d3748;
      color: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .code-example code {
      white-space: pre;
    }
    .instructions {
      background-color: #ebf8ff;
      border: 1px solid #90cdf4;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
      background: white;
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card h3 {
      margin: 0.5rem 0;
    }
  `]
})
export class Step5ClsIssueComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain(20);
  }
}
