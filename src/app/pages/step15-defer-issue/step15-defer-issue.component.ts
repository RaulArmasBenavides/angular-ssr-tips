import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step15-defer-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 15: Loading All Cards Issue</h1>
        <nav>
          <a routerLink="/step-14">← Previous</a>
          <a routerLink="/step-16" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Loading all cards at once can cause performance issues, especially with many items.
          This creates:
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Large initial payload</li>
            <li>Slow initial render</li>
            <li>Unnecessary memory usage</li>
            <li>Poor performance on mobile devices</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
&lt;div class="cards-container"&gt;
&#64;for (card of cards; track card.id) {{ '{' }}
    &lt;div class="card"&gt;
      &lt;img [ngSrc]="card.imageUrl"&gt;
    &lt;/div&gt;
  {{ '}' }}
&lt;/div&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Scroll down slowly and watch the network tab.
          Notice how all images are loaded immediately, even those not in view.
        </p>

        <div class="stats">
          <p>Total Cards: {{ cards.length }}</p>
          <p>All cards are loaded and rendered immediately!</p>
        </div>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <div class="card">
              <picture>
                <source
                  srcset="https://picsum.photos/400/300.webp?random={{card.id}}"
                  type="image/webp"
                >
                <img
                  ngSrc="https://picsum.photos/400/300?random={{card.id}}"
                  width="400"
                  height="300"
                  [alt]="card.title"
                >
              </picture>
              <div class="card-content">
                <h3>{{ card.title }}</h3>
                <p class="load-info">Loaded immediately with page</p>
              </div>
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
    .stats {
      background-color: #e2e8f0;
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
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      background: white;
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card-content {
      padding: 1rem 0;
    }
    .load-info {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  `]
})
export class Step15DeferIssueComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    // Loading 100 cards to make the issue more evident
    this.cards = this.testDataService.generateCardsWithSingleDomain(100);
  }
}
