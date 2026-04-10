import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step11-template-function-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 11: Template Functions Issue</h1>
        <nav>
          <a routerLink="/step-10">← Previous</a>
          <a routerLink="/step-12" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Using functions in templates forces Angular to execute them on every change detection cycle,
          which can significantly impact performance.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Functions executed on every change detection</li>
            <li>No way to memoize results</li>
            <li>Performance degrades with more items</li>
            <li>Unnecessary calculations</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
// Template with function calls
&lt;div class="card"&gt;
  &lt;h3&gt;{{ '{' }}card.title{{ '}' }}&lt;/h3&gt;
  &lt;p&gt;Price: {{ '{' }}formatPrice(card.price){{ '}' }}&lt;/p&gt;
  &lt;p&gt;Discount: {{ '{' }}calculateDiscount(card.price){{ '}' }}&lt;/p&gt;
&lt;/div&gt;

// Component class
formatPrice(price: number): string {{ '{' }}
  console.count('formatPrice called');
  return price.toFixed(2);
{{ '}' }}

calculateDiscount(price: number): string {{ '{' }}
  console.count('calculateDiscount called');
  return (price * 0.1).toFixed(2);
{{ '}' }}
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Open the console and scroll the page or hover over elements.
          Notice how both the count functions and price formatting functions
          are called repeatedly during normal interaction.
        </p>

        <div class="stats">
          <!-- Here -->
          <p>Total Images: {{ getLoadedImagesCount() }}</p>
          <p>Total Value: {{ formatPrice(getTotalValue()) }}</p>
          <button (click)="addCard()" class="btn">Add New Card</button>
        </div>

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
                <!-- Here -->
                <h3>{{ card.title }}</h3>
                <p class="price">Price: {{ formatPrice(card.price ?? 0) }}</p>
                <p class="discount">Discount: {{ calculateDiscount(card.price ?? 0) }}</p>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    .image-number {
      color: #718096;
      font-size: 0.875rem;
    }
    .btn {
      background-color: #4a5568;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover {
      background-color: #2d3748;
    }
  `]
})
export class Step11TemplateFunctionIssueComponent {
  cards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain(50).map(card => ({
      ...card,
      price: Math.random() * 100 // Add random price between 0 and 100
    }));
  }
  // Here
  formatPrice(price: number): string {
    console.count('formatPrice called');
    let result = price;
    for(let i = 0; i < 100; i++) {
      result = result * 1.0001;
    }
    return `$${price.toFixed(2)}`;
  }

  calculateDiscount(price: number): string {
    console.count('calculateDiscount called');
    let result = price;
    for(let i = 0; i < 100; i++) {
      result = result * 0.999;
    }
    return `$${(price * 0.1).toFixed(2)}`;
  }

  getTotalValue(): number {
    console.count('getTotalValue called');
    return this.cards.reduce((sum, card) => sum + (card.price || 0), 0);
  }

  getLoadedImagesCount(): number {
    console.count('getLoadedImagesCount called');
    return this.cards.length;
  }

  getAboveFoldCount(): number {
    console.count('getAboveFoldCount called');
    return this.cards.filter(card => card.id <= 4).length;
  }

  getImageNumber(card: Card): number {
    console.count('getImageNumber called');
    return card.id;
  }

  addCard() {
    const newCard: Card = {
      id: this.cards.length + 1,
      title: `Image ${this.cards.length + 1}`,
      imageUrl: `https://picsum.photos/400/300?random=${this.cards.length + 1}`,
      price: Math.random() * 100
    };
    this.cards = [...this.cards, newCard];
  }
}
