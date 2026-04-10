import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-step13-change-detection-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, FormsModule],
  // Here
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 13: Change Detection Issue</h1>
        <nav>
          <a routerLink="/step-12">← Previous</a>
          <a routerLink="/step-14" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Even with OnPush change detection, poor component design can lead to unnecessary
          re-renders. In this example, typing in the search input causes all cards to re-render.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Every keystroke triggers change detection for all cards</li>
            <li>OnPush doesn't help because the parent component updates</li>
            <li>Performance degrades with more items</li>
            <li>Unnecessary DOM updates</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
          &#64;Component({{ '{' }}
  template:
    &lt;input [(ngModel)]="searchTerm"&gt;
    &lt;div *ngFor="let card of filteredCards"&gt;
       {{ '{' }} card.title {{ '}' }}
    &lt;/div&gt;

{{ '}' }})
export class ProblematicComponent {{ '{' }}
  searchTerm = '';
  cards: Card[] = [];

  get filteredCards() {{ '{' }}
    return this.cards.filter(card =>
      card.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  {{ '}' }}
{{ '}' }}
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Type in the search box below and watch the console.
          Even though filtering only happens when you press Enter,
          notice how every card gets re-rendered on each keystroke.
          <br><br>
          <strong>Try typing and watch the render counts increase, even though the list hasn't filtered yet!</strong>
        </p>

        <div class="search-box">
          <!-- Here -->
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Type and press Enter to search..."
            class="search-input"
            (keyup.enter)="applyFilter()"
          >
          <div class="search-info">
            Current term: "{{ searchTerm }}"<br>
            Applied filter: "{{ appliedFilter }}"
          </div>
        </div>

        <div class="cards-container">
          <!-- Here -->
          @for (card of filteredCards; track card.id) {
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
                <p class="render-count">
                  Renders: {{ getRenderCount(card.id) }}
                </p>
                <p class="typing-indicator">
                  Component rendered due to typing: {{ searchTerm }}
                </p>
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
    .search-box {
      margin: 1rem 0;
    }
    .search-input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
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
    .render-count {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    .search-info {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #edf2f7;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .typing-indicator {
      color: #805ad5;
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }
  `]
})
export class Step13ChangeDetectionIssueComponent {
  cards: Card[] = [];
  searchTerm = '';
  appliedFilter = '';
  private renderCounts: Record<number, number> = {};

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain(50);
  }

  get filteredCards(): Card[] {
    console.count('filteredCards getter called');
    return this.cards.filter(card =>
      !this.appliedFilter ||
      card.title.toLowerCase().includes(this.appliedFilter.toLowerCase())
    );
  }

  applyFilter() {
    this.appliedFilter = this.searchTerm;
  }

  getRenderCount(cardId: number): number {
    this.renderCounts[cardId] = (this.renderCounts[cardId] || 0) + 1;
    console.log(`Card ${cardId} rendered ${this.renderCounts[cardId]} times`);
    return this.renderCounts[cardId];
  }
}
