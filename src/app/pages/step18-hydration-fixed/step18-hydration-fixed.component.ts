import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step18-hydration-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 18: Hydration Fixed</h1>
        <nav>
          <a routerLink="/step-17">← Previous</a>
          <a routerLink="/step-19" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          With hydration, the server pre-renders the HTML and sends it immediately.
          The page is interactive once JavaScript loads, but users can see content right away.
        </p>

        <p>
          Don't forget to enable the hydration provider in <code>app.config.ts</code>
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>Immediate content visibility</li>
            <li>Better First Contentful Paint (FCP)</li>
            <li>Improved Largest Contentful Paint (LCP)</li>
            <li>Progressive enhancement</li>
          </ul>
        </div>

        <div class="hydration-info">
          <h3>How Hydration Works:</h3>
          <ol>
            <li>Server pre-renders HTML with initial data</li>
            <li>Client receives and displays HTML immediately</li>
            <li>JavaScript loads and "hydrates" the page</li>
            <li>Application becomes fully interactive</li>
          </ol>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
// main.ts
bootstrapApplication(AppComponent, {{ '{' }}
  providers: [
    provideClientHydration()
  ]
{{ '}' }});

// Component
&#64;Component({{ '{' }}
  template:
    &lt;div class="cards-container"&gt;
    &#64;for (card of cards; track card.id) {{ '{' }}
        &lt;div class="card"&gt;...&lt;/div&gt;
      {{ '}' }}
    &lt;/div&gt;

{{ '}' }})
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Refresh the page and notice how content is visible immediately,
          even though the application is not yet interactive.
        </p>

        <div class="loading-info">
          <div class="status">
            Status: {{ isInteractive ? 'Interactive' : 'Non-Interactive' }}
          </div>
          <div class="timer" *ngIf="!isInteractive">
            Hydrating in {{ timer }}s
          </div>
        </div>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <div class="card" [class.non-interactive]="!isInteractive">
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
                <p class="load-info" [class.success]="isInteractive">
                  {{ isInteractive ? 'Interactive Content!' : 'Non-Interactive Content' }}
                </p>
                <button
                  class="demo-button"
                  (click)="handleClick(card)"
                >
                  {{ isInteractive ? 'Click me!' : 'Waiting for hydration...' }}
                </button>
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
      background-color: #f0fff4;
      border: 1px solid #9ae6b4;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .benefits {
      background-color: #f0fff4;
      border: 1px solid #68d391;
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
    .load-info.success {
      color: #22c55e;
    }
    .loading-info {
      text-align: center;
      padding: 2rem;
      background-color: #f0fff4;
      border: 1px solid #68d391;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .timer {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 1rem;
      color: #22c55e;
    }
    .hydration-info {
      background-color: #f0fff4;
      border: 1px solid #68d391;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .hydration-info ol {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    .status {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .non-interactive {
      opacity: 0.8;
      position: relative;
    }
    .non-interactive::after {
      content: 'Non-Interactive';
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: #e53e3e;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    .demo-button {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #4a5568;
      color: white;
      cursor: pointer;
    }
    .demo-button:disabled {
      background-color: #cbd5e0;
      cursor: not-allowed;
    }
  `]
})
export class Step18HydrationFixedComponent implements OnInit {
  cards: Card[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    imageUrl: `https://picsum.photos/400/300?random=${i + 1}`
  }));

  isInteractive = false;
  timer = 3;
  private interval: any;
  private platformId = inject(PLATFORM_ID);

  constructor(private testDataService: TestDataService) {
    // Ensure initial state is non-interactive
    this.isInteractive = false;
  }

  ngOnInit() {
    // Only start hydration process in browser
    if (isPlatformBrowser(this.platformId)) {
      // this.startTimer();
      this.isInteractive = true;
      this.loadData();
    }
  }

  // private startTimer() {
  //   this.interval = setInterval(() => {
  //     this.isInteractive = true;
  //     this.timer--;
  //     if (this.timer === 0) {
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  // }

  private loadData() {
    this.cards = this.testDataService.generateCardsWithSingleDomain(20)
  }

  handleClick(card: Card) {
    console.log(`Clicked card ${card.id}`);
  }

  ngOnDestroy() {
    // if (this.interval) {
    //   clearInterval(this.interval);
    // }
  }
}
