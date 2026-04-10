import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step6-cls-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 6: Layout Shifts Fixed</h1>
        <nav>
          <a routerLink="/step-5">← Previous</a>
          <a routerLink="/step-7" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          Using NgOptimizedImage directive with proper width and height attributes prevents layout
          shifts by reserving space for images before they load.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>No layout shifts during loading</li>
            <li>Automatic lazy loading</li>
            <li>Proper aspect ratio maintained</li>
            <li>Better Core Web Vitals scores</li>
            <li>Automatic image optimization</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
&lt;div class="card"&gt;
  &lt;img
    [ngSrc]="card.imageUrl"
    width="1080"
    height="720"
    [alt]="card.title"
    [priority]="card.id <= 4"
  &gt;
  &lt;h3&gt; {{ '{'+'{' }}card.title {{ '}'+'}' }}&lt;/h3&gt; &lt;/div&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Notice how the layout remains stable as images load. The space is reserved
          immediately, and images fade in smoothly. Priority images above the fold
          load first.
        </p>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <div class="card">
              <!-- Here -->
              <img
                [ngSrc]="card.imageUrl"
                width="320"
                height="150"
                [alt]="card.title"
                [priority]="card.id <= 4"
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
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
      background: white;
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      aspect-ratio: 1080 / 720;
    }
    .card h3 {
      margin: 0.5rem 0;
    }
  `]
})
export class Step6ClsFixedComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain(20);
  }
}
