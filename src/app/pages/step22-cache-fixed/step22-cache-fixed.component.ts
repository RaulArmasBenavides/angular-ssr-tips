import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-step22-cache-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 22: HTTP Transfer Cache Fixed</h1>
        <nav>
          <a routerLink="/step-21">← Previous</a>
          <a routerLink="/" class="next">Home</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          Using HTTP transfer cache, we can reuse the data fetched during server-side
          rendering on the client, eliminating duplicate requests.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>No duplicate API calls</li>
            <li>Faster client-side rendering</li>
            <li>Reduced server load</li>
            <li>Better bandwidth usage</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
// app.config.ts
export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideHttpClient(
      withFetch()
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({{ '{' }}
        includePostRequests: true
      {{ '}' }})
    )
  ]
{{ '}' }};

// The same API call is now cached
this.api.getCards().subscribe(cards => {{ '{' }}
  this.cards = cards;
{{ '}' }});
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Watch the network tab and console. Notice how the data is only
          fetched once during SSR and reused on the client.
        </p>

        <div class="api-status">
          <div class="status-indicator" [class.loading]="loading">
            {{ loading ? 'Fetching data...' : 'Data loaded' }}
            {{ loading ? '' : '(from transfer cache)' }}
          </div>
          <button class="refresh-button" (click)="refreshData()">
            Refresh Data
          </button>
        </div>

        <div class="network-info">
          <h3>Request Information:</h3>
          <div class="request-log">
            @for (request of requestLog; track request.timestamp) {
              <div class="request-entry">
                <div class="request-header">
                  <span class="timestamp">{{ request.timestamp | date:'HH:mm:ss.SSS' }}</span>
                  <span class="message" [class.cached]="request.cached">
                    {{ request.message }}
                  </span>
                </div>
                @if (request.data) {
                  <div class="request-data">
                    <pre>{{ request.data | json }}</pre>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div class="cards-container">
          @if (loading) {
            <div class="loading-skeleton">
              @for (item of [1,2,3,4]; track item) {
                <div class="skeleton-card"></div>
              }
            </div>
          }

          @if (cards.length) {
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
                </div>
              </div>
            }
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
    .api-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f7fafc;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #48bb78;
      font-weight: 500;
    }
    .status-indicator.loading {
      color: #ed8936;
    }
    .status-indicator.loading::after {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid #ed8936;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .refresh-button {
      padding: 0.5rem 1rem;
      background-color: #4a5568;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .refresh-button:hover {
      background-color: #2d3748;
    }
    .network-info {
      background-color: #1a202c;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .request-log {
      max-height: 200px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .request-entry {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
      background-color: #2d3748;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .request-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .request-data {
      padding: 0.5rem;
      background-color: #1a202c;
      border-radius: 4px;
      font-size: 0.75rem;
      overflow-x: auto;
    }
    .request-data pre {
      margin: 0;
      color: #a0aec0;
    }
    .request-data pre:hover {
      color: #f7fafc;
    }
    .timestamp {
      color: #90cdf4;
      white-space: nowrap;
    }
    .message {
      color: #f7fafc;
    }
    .message.cached {
      color: #68d391;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .message.cached::before {
      content: '✓';
      color: #68d391;
    }
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .loading-skeleton {
      display: contents;
    }
    .skeleton-card {
      height: 400px;
      background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
    }
    .card {
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      background: white;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card-content {
      padding: 1rem 0;
    }
    .card-content h3 {
      margin: 0;
      color: #2d3748;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      to { background-position: -200% 0; }
    }
  `]
})
export class Step22CacheFixedComponent implements OnInit {
  cards: Card[] = [];
  loading = true;
  requestLog: Array<{ timestamp: Date; message: string; cached?: boolean; data?: any }> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData('Initial Load');
  }

  loadData(source: string = 'Manual Refresh') {
    this.loading = true;
    this.logRequest(`Starting API request (${source})...`);

    this.apiService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.loading = false;
        this.logRequest(`Data received from ${source}`, true, {
          totalCards: cards.length,
          firstCard: cards[0],
          lastCard: cards[cards.length - 1],
          timestamp: new Date().toISOString()
        });
      },
      error: (error) => {
        this.loading = false;
        this.logRequest(`Error fetching data: ${error}`, false, { error });
      }
    });
  }

  refreshData() {
    this.logRequest('Manual refresh requested - checking cache...');
    this.loadData('Manual Refresh');
  }

  private logRequest(message: string, cached: boolean = false, data?: any) {
    const logEntry = {
      timestamp: new Date(),
      message: `${message}${cached ? ' (Cached Response)' : ''}`,
      cached,
      data
    };

    // Log to console with colors
    if (data) {
      console.group(`%c${logEntry.message}`, `color: ${cached ? '#68d391' : '#4299e1'}`);
      console.log('Timestamp:', logEntry.timestamp);
      console.log('Data:', data);
      console.groupEnd();
    }

    this.requestLog.unshift(logEntry);

    // Keep only last 10 requests
    if (this.requestLog.length > 10) {
      this.requestLog.pop();
    }
  }
}
