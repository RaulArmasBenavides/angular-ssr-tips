import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-step21-cache-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 21: HTTP Transfer Cache Issue</h1>
        <nav>
          <a routerLink="/step-20">← Previous</a>
          <a routerLink="/step-22" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Without HTTP transfer cache, the application makes unnecessary API calls
          for data that could be cached during server-side rendering.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Duplicate API calls</li>
            <li>Unnecessary network requests</li>
            <li>Slower client-side rendering</li>
            <li>Wasted bandwidth</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
// app.config.ts
export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideHttpClient()
  ]
{{ '}' }};

// Component
&#64;Component({{ '{' }}...{{ '}' }})
export class Component {{ '{' }}
  ngOnInit() {{ '{' }}
    // Same data requested on server and client
    this.api.getCards().subscribe(cards => {{ '{' }}
      this.cards = cards;
    {{ '}' }});
  {{ '}' }}
{{ '}' }}
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Watch the network tab and console. Notice how the same data
          is fetched twice - once on the server and once on the client.
        </p>

        <div class="api-status">
          <div class="status-indicator" [class.loading]="loading">
            {{ loading ? 'Fetching data...' : 'Data loaded' }}
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
                <span class="timestamp">{{ request.timestamp | date:'HH:mm:ss.SSS' }}</span>
                <span class="message">{{ request.message }}</span>
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
    }
    .request-entry {
      display: flex;
      gap: 1rem;
      padding: 0.5rem;
      background-color: #2d3748;
      border-radius: 4px;
      margin-top: 0.5rem;
      font-family: monospace;
    }
    .timestamp {
      color: #90cdf4;
    }
    .message {
      color: #f7fafc;
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
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card-content {
      padding: 1rem 0;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      to { background-position: -200% 0; }
    }
  `]
})
export class Step21CacheIssueComponent implements OnInit {
  cards: Card[] = [];
  loading = true;
  requestLog: Array<{ timestamp: Date; message: string }> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.logRequest('Starting API request...');

    this.apiService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.loading = false;
        this.logRequest('Data received from API');
      },
      error: (error) => {
        this.loading = false;
        this.logRequest('Error fetching data: ' + error);
      }
    });
  }

  refreshData() {
    this.loadData();
  }

  private logRequest(message: string) {
    this.requestLog.unshift({
      timestamp: new Date(),
      message
    });

    // Keep only last 10 requests
    if (this.requestLog.length > 10) {
      this.requestLog.pop();
    }
  }
}
