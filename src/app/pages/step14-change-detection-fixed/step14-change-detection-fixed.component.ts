import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.interface';
import { TestDataService } from '../../services/test-data.service';
import { SearchBoxComponent } from './search-box.component';
import { CardsListComponent } from './cards-list.component';

@Component({
  selector: 'app-step14-change-detection-fixed',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBoxComponent, CardsListComponent],
  // Here
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 14: Change Detection Fixed</h1>
        <nav>
          <a routerLink="/step-13">← Previous</a>
          <a routerLink="/step-15" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Solution</h2>
        <p>
          By splitting the search input and card list into separate components,
          we prevent unnecessary re-renders of the cards when typing.
        </p>

        <div class="benefits">
          <h3>Benefits:</h3>
          <ul>
            <li>Search input changes don't affect card list</li>
            <li>OnPush change detection works effectively</li>
            <li>Better component isolation</li>
            <li>Improved performance</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Fixed Code:</h3>
          <pre><code>
// Separate search component
&#64;Component({{ '{' }}
  selector: 'app-search-box',
  template:
    &lt;input [(ngModel)]="searchTerm" (ngModelChange)="search.emit($event)"&gt;

{{ '}' }})
export class SearchBoxComponent {{ '{' }}
&#64;Output() search = new EventEmitter&lt;string&gt;();
{{ '}' }}

// Separate cards list component
&#64;Component({{ '{' }}
  selector: 'app-cards-list',
  changeDetection: ChangeDetectionStrategy.OnPush
{{ '}' }})
export class CardsListComponent {{ '{' }}
&#64;Input() cards: Card[] = [];
{{ '}' }}

// Parent component
&#64;Component({{ '{' }}
  template:
    &lt;app-search-box (search)="onSearch($event)"&gt;&lt;/app-search-box&gt;
    &lt;app-cards-list [cards]="filteredCards"&gt;&lt;/app-cards-list&gt;

{{ '}' }})
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Type in the search box below and watch the console.
          Notice how the cards only re-render when the filtered results change,
          not on every keystroke.
        </p>

        <p class="instructions">Learn more about better design of components <a href="https://www.youtube.com/watch?v=f8sA-i6gkGQ&t=680s" target="_blank">here</a>.</p>
        <!-- Here -->
        <app-search-box (search)="onSearch($event)" />
        <app-cards-list [cards]="filteredCards" />
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
  `]
})
export class Step14ChangeDetectionFixedComponent {
  cards: Card[] = [];
  filteredCards: Card[] = [];

  constructor(private testDataService: TestDataService) {
    this.cards = this.testDataService.generateCardsWithSingleDomain(50);
    this.filteredCards = this.cards;
  }

  onSearch(term: string) {
    this.filteredCards = this.cards.filter(card =>
      card.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
