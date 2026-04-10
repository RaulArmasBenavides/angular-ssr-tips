import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step3-dns-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, CardItemComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 3: Multiple DNS Lookups Issue</h1>
        <nav>
          <a routerLink="/step-2">← Previous</a>
          <a routerLink="/step-4" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          When loading images from multiple domains, the browser needs to perform a DNS lookup
          for each unique domain. This can significantly slow down the initial page load.
        </p>

        <div class="performance-impact">
          <h3>Performance Impact:</h3>
          <ul>
            <li>Multiple DNS resolutions (check Network tab)</li>
            <li>Additional TCP connections</li>
            <li>Increased latency</li>
            <li>More SSL handshakes</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
// Images coming from different domains
"https://images1.example.com/image1.jpg"
"https://cdn2.different-domain.com/image2.jpg"
"https://static.another-server.net/image3.jpg"
"https://media.different-host.com/image4.jpg"
// ... and so on
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Open Chrome DevTools (Network tab) and check the number of unique domains being accessed.
          Each requires a separate DNS lookup.

          To simulate a fresh DNS lookup, clear the DNS cache by navigating to <a href="chrome://net-internals/#dns">chrome://net-internals/#dns</a> and clicking on Clear host cache.
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
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class Step3DnsIssueComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithMultipleDomains();
  }
}
