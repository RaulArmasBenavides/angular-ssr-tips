import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { PLATFORM_ID, inject } from '@angular/core';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step20-event-replay',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 20: Event Replay During Hydration</h1>
        <nav>
          <a routerLink="/step-19">← Previous</a>
          <a routerLink="/step-21" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>Event Replay</h2>
        <p>
          When users interact with the page before hydration is complete,
          Angular can capture and replay those events once the application becomes interactive.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>No lost user interactions</li>
            <li>Seamless user experience</li>
            <li>Better perceived performance</li>
            <li>Improved user confidence</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Implementation:</h3>
          <pre><code>
// Enable event replay in app.config.ts
provideClientHydration({{ '{' }}
  replayEvents: true
{{ '}' }})

// Events are automatically captured and replayed
&lt;button (click)="handleClick()"&gt;
  Click me during hydration!
&lt;/button&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Try clicking the cards before hydration is complete.
          Your clicks will be captured and replayed once the application becomes interactive.
          <br><br>
          <strong>Watch the console to see the events being replayed!</strong>
          <br><br>
          <strong>Don't forget to enable event replay in <code>app.config.ts</code>!</strong>
        </p>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <div
              class="card"
              [class.interactive]="isInteractive"
              (click)="handleCardClick(card)"
            >
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
                  {{ isInteractive ? 'Interactive!' : 'Capturing clicks...' }}
                </p>
                <button
                  class="demo-button"
                  [class.capturing]="!isInteractive"
                  (click)="handleButtonClick(card, $event)"
                >
                  {{ isInteractive ? 'Click me!' : 'Click will be replayed' }}
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
    .loading-info {
      text-align: center;
      padding: 2rem;
      background-color: #f0fff4;
      border: 1px solid #68d391;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .status {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    .status small {
      font-size: 0.875rem;
      color: #4a5568;
    }
    .timer {
      font-size: 2rem;
      font-weight: bold;
      color: #22c55e;
    }
    .event-log {
      background-color: #1a202c;
      color: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      max-height: 200px;
      overflow-y: auto;
    }
    .log-entries {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .log-entry {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #2d3748;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .log-entry.replayed {
      background-color: #2f855a;
    }
    .log-entry small {
      color: #a0aec0;
      margin-left: 1rem;
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
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card.interactive {
      border-color: #68d391;
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #718096;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #f7fafc;
      border-radius: 4px;
    }
    .load-info.success {
      color: #22c55e;
      background-color: #f0fff4;
    }
    .demo-button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #4a5568;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .demo-button:hover {
      background-color: #2d3748;
    }
    .demo-button.capturing {
      background-color: #ed8936;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
  `]
})
export class Step20EventReplayComponent {
  cards: Card[] = [];
  isInteractive = false;
  platformId = inject(PLATFORM_ID);

  constructor(private testDataService: TestDataService) {}

  ngOnInit() {
    this.cards = this.testDataService.generateCardsWithSingleDomain(20);
    if (isPlatformBrowser(this.platformId)) {
      this.isInteractive = true;
      console.log('Event replay enabled - try clicking before hydration!');
    }
  }


  handleCardClick(card: Card) {
    console.log(`Card ${card.id} click handled`);
  }

  handleButtonClick(card: Card, event: Event) {
    console.log(`Button clicked on card ${card.id}`, this.isInteractive);
  }

}
