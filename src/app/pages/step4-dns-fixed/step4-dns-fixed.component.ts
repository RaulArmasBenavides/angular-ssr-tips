import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step4-dns-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, CardItemComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 4: DNS Lookups Fixed</h1>
        <nav>
          <a routerLink="/step-3">← Previous</a>
          <a routerLink="/step-5" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          By using a single CDN domain for all images, we eliminate multiple DNS lookups
          and reduce the number of TCP connections needed.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>Single DNS lookup</li>
            <li>Reused TCP connections</li>
            <li>Better browser caching</li>
            <li>Reduced SSL handshakes</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
// All images from the same CDN domain
"https://cdn.optimized-domain.com/images/image1.jpg"
"https://cdn.optimized-domain.com/images/image2.jpg"
"https://cdn.optimized-domain.com/images/image3.jpg"
"https://cdn.optimized-domain.com/images/image4.jpg"
// ... and so on
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Open Chrome DevTools (Network tab) and notice how all requests now go to a single domain.
          Compare the loading performance with the previous step.
        </p>

        <div class="cards-container">
          @for (card of cards; track card.id) {
            <app-card-item [card]="card" />
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
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class Step4DnsFixedComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain();
  }
}
