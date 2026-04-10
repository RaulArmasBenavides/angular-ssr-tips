import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step16-defer-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 16: Deferred Loading Fixed</h1>
        <nav>
          <a routerLink="/step-15">← Previous</a>
          <a routerLink="/step-17" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          Using deferrable views, we can load cards only when they're about to enter
          the viewport, significantly improving initial load time and memory usage.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>Faster initial page load</li>
            <li>Reduced memory usage</li>
            <li>Better performance on mobile</li>
            <li>Improved user experience</li>
          </ul>
        </div>

        <div class="triggers-info">
          <h3>Available Triggers:</h3>
          <ul>
            <li>
              <code>on viewport</code>: Loads when element enters viewport
              <pre><code>&#64;defer (on viewport) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>
              <code>on idle</code>: Loads when browser is idle
              <pre><code>&#64;defer (on idle) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>
              <code>on immediate</code>: Loads as soon as possible
              <pre><code>&#64;defer (on immediate) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>
              <code>on hover</code>: Loads when user hovers over placeholder
              <pre><code>&#64;defer (on hover) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>
              <code>on interaction</code>: Loads on any user interaction with placeholder
              <pre><code>&#64;defer (on interaction) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>
              <code>when</code>: Loads when condition is true
              <pre><code>&#64;defer (when isReady) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
          </ul>
        </div>

        <div class="best-practices">
          <h3>Best Practices:</h3>
          <ul>
            <li>Use placeholders to prevent layout shifts</li>
            <li>Combine triggers for better user experience:
              <pre><code>&#64;defer (on viewport; on hover) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>Prefetch for critical content:
              <pre><code>&#64;defer (on viewport; prefetch on idle) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>Set minimum loading time to prevent flashing:
              <pre><code>&#64;defer (minimum 300ms) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
            <li>Use after blocks for sequential loading:
              <pre><code>&#64;defer (after hero-section) {{ '{' }} content {{ '}' }}</code></pre>
            </li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
&lt;div class="cards-container"&gt;
&#64;for (card of cards; track card.id) {{ '{' }}
&#64;defer (on viewport; prefetch on idle) {{ '{' }}
      &lt;div class="card"&gt;
        &lt;img [ngSrc]="card.imageUrl"&gt;
      &lt;/div&gt;
    {{ '}' }} &#64;placeholder {{ '{' }}
      &lt;div class="card placeholder"&gt;
        &lt;div class="placeholder-content"&gt;&lt;/div&gt;
      &lt;/div&gt;
    {{ '}' }}
  {{ '}' }}
&lt;/div&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Scroll down slowly and watch the network tab.
          Notice how images are only loaded as they enter the viewport.
        </p>

        <div class="stats">
          <p>Total Cards: {{ cards.length }}</p>
          <p>Cards are loaded as you scroll!</p>
        </div>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            @defer (on viewport; prefetch on idle) {
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
                  <p class="load-info success">Loaded when scrolled into view</p>
                </div>
              </div>
            } @placeholder {
              <div class="card placeholder">
                <div class="placeholder-image"></div>
                <div class="placeholder-content">
                  <div class="placeholder-title"></div>
                  <div class="placeholder-text"></div>
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
    .load-info.success {
      color: #22c55e;
    }
    .placeholder {
      background: #f8fafc;
      animation: pulse 2s infinite;
    }
    .placeholder-image {
      width: 100%;
      height: 300px;
      background: #e2e8f0;
      border-radius: 4px;
    }
    .placeholder-content {
      padding: 1rem 0;
    }
    .placeholder-title {
      height: 24px;
      background: #e2e8f0;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    .placeholder-text {
      height: 16px;
      background: #e2e8f0;
      border-radius: 4px;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    .triggers-info,
    .best-practices {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .triggers-info code,
    .best-practices code {
      background-color: #334155;
      color: #fff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .triggers-info pre,
    .best-practices pre {
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: #334155;
      border-radius: 4px;
    }
    .triggers-info pre code,
    .best-practices pre code {
      padding: 0;
    }
  `]
})
export class Step16DeferFixedComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    // Same amount of cards but loaded differently
    this.cards = this.testDataService.generateCardsWithSingleDomain(100);
  }
}
