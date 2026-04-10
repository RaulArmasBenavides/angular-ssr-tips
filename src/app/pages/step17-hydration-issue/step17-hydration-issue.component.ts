import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step17-hydration-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 17: No Hydration Issue</h1>
        <nav>
          <a routerLink="/step-16">← Previous</a>
          <a routerLink="/step-18" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Without hydration, users have to wait for data to load before seeing any content.
          This creates a poor user experience with blank screens during data fetching.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Blank screen during data loading</li>
            <li>Poor First Contentful Paint (FCP)</li>
            <li>High Largest Contentful Paint (LCP)</li>
            <li>No progressive enhancement</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
          &#64;Component({{ '{' }}
  template:
    &lt;div *ngIf="cards"&gt;
    &#64;for (card of cards; track card.id) {{ '{' }}
        &lt;div class="card"&gt;...&lt;/div&gt;
      {{ '}' }}
    &lt;/div&gt;
  \
{{ '}' }})
export class Component {{ '{' }}
  cards: Card[] | null = null;

  constructor() {{ '{' }}
    // Wait for data before showing anything
    this.loadData();
  {{ '}' }}
{{ '}' }}
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Refresh the page and notice how there's a 3-second blank screen
          before any content appears.
        </p>

        <div class="loading-info" *ngIf="!cards">
          Loading data... (3 seconds delay)
          <div class="timer">{{ timer }}s</div>
        </div>

        @if (cards) {
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
                    [priority]="card.id <= 4"
                  >
                </picture>
                <div class="card-content">
                  <h3>{{ card.title }}</h3>
                  <p class="load-info">Content only visible after data loads</p>
                </div>
              </div>
            }
          </div>
        }
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
    .loading-info {
      text-align: center;
      padding: 2rem;
      background-color: #fff5f5;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .timer {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 1rem;
      color: #e53e3e;
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
export class Step17HydrationIssueComponent {
  cards: Card[] | null = null;
  timer = 3;
  private interval: any;

  constructor(private testDataService: TestDataService) {
    // this.startTimer();
    this.loadData();
  }

  private startTimer() {
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private loadData() {
    this.cards = this.testDataService.generateCardsWithSingleDomain(20);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
