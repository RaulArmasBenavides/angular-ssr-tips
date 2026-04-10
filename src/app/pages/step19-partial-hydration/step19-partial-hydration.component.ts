import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { inject } from '@angular/core';
import { TestDataService } from '../../services/test-data.service';
import { LifecycleLoggerDirective } from '../../directives/lifecycle-logger.directive';

@Component({
  selector: 'app-step19-partial-hydration',
  standalone: true,
  imports: [CommonModule, RouterLink, LifecycleLoggerDirective],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 19: Partial Hydration</h1>
        <nav>
          <a routerLink="/step-18">← Previous</a>
          <a routerLink="/step-20" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution: Partial Hydration</h2>
        <p>
          Instead of hydrating all components at once, we can use partial hydration
          to hydrate components only when they're needed.
        </p>

        <p>
          Notice how each card gets hydrated individually when hovered over.
        </p>

        <p>Don't forget to enable <code>provideClientHydration(withIncrementalHydration())</code> in <code>app.config.ts</code>!</p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>Reduced initial JavaScript bundle</li>
            <li>Faster Time to Interactive (TTI)</li>
            <li>Better memory usage</li>
            <li>Improved performance on mobile devices</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Implementation:</h3>
          <pre><code>
&#69;defer (on hover) {{ '{' }}
  &lt;div class="card interactive"&gt;
    &lt;!-- Interactive content --&gt;
  &lt;/div&gt;
{{ '}' }} &#69;placeholder {{ '{' }}
  &lt;div class="card non-interactive"&gt;
    &lt;!-- Static content --&gt;
  &lt;/div&gt;
{{ '}' }}
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Hover over any card to hydrate it. Notice how each card becomes
          interactive individually, rather than all at once.
          <br><br>
          <strong>Check the console to see when each card gets hydrated!</strong>
        </p>

        <div class="cards-container">
          @for (card of cards; track card.id) {
             @defer (hydrate on hover) {
              <div class="card interactive" appLifecycleLogger>
                <div class="card-content">
                  <h3>{{ card.title }}</h3>
                  <p class="load-info success">
                    ✨ On hover to hydrate!
                  </p>
                  <button
                    class="demo-button"
                    (click)="handleClick(card)"
                  >
                    Click me!
                  </button>
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
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card-content {
      padding: 1rem 0;
    }
    .card.interactive {
      border-color: #68d391;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card.non-interactive {
      opacity: 0.9;
      cursor: pointer;
    }
    .card.non-interactive:hover {
      opacity: 1;
      border-color: #90cdf4;
    }
    .card.loading {
      background: #f7fafc;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #90cdf4;
    }
    .loading-indicator {
      color: #4299e1;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .loading-indicator::before {
      content: '';
      width: 24px;
      height: 24px;
      border: 3px solid #90cdf4;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
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
      transition: background-color 0.3s ease;
      font-weight: 500;
    }
    .demo-button:hover:not(:disabled) {
      background-color: #2d3748;
    }
    .demo-button:disabled {
      background-color: #e2e8f0;
      cursor: not-allowed;
      color: #a0aec0;
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
  `]
})
export class Step19PartialHydrationComponent {

  private testDataService = inject(TestDataService);

  cards: Card[] = this.testDataService.generateCardsWithSingleDomain(30)

  handleClick(card: Card) {
      console.log(`Card ${card.id} clicked - fully hydrated!`);
    // if (isPlatformBrowser(this.platformId)) {
    //   alert(`Interactive card ${card.id} clicked!`);
    // }
  }

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log('Client-side: Ready for partial hydration');
    // }
  }
}
