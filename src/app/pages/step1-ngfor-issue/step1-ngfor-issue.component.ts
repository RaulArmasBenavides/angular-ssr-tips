import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { Card } from '../../models/card.interface';
import { LifecycleLoggerDirective } from '../../directives/lifecycle-logger.directive';

@Component({
  selector: 'app-step1-ngfor-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, CardItemComponent, LifecycleLoggerDirective],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 1: NgFor Performance Issue</h1>
        <nav>
          <a routerLink="/">← Home</a>
          <a routerLink="/step-2" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>When using *ngFor without trackBy, Angular recreates all DOM elements when the array changes,
           even if most items remain the same. Open your console to see components being recreated.</p>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
  &lt;app-card-item
    *ngFor="let card of cards"
    [card]="card"
    appLifecycleLogger
  /&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <button (click)="replaceCards()" class="btn">Replace cards </button>
        <button (click)="addCard()" class="btn">Add New Card</button>

        <div class="cards-container">
          <app-card-item
            *ngFor="let card of cards"
            [card]="card"
            appLifecycleLogger
          />
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
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
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
export class Step1NgforIssueComponent {
  // <!-- HERE -->
  cards: Card[] = [
    {
      id: 1,
      title: 'Card 1',
      imageUrl: 'https://picsum.photos/200/200?random=1'
    },
    {
      id: 2,
      title: 'Card 2',
      imageUrl: 'https://picsum.photos/200/200?random=2'
    },
    {
      id: 3,
      title: 'Card 3',
      imageUrl: 'https://picsum.photos/200/200?random=3'
    }
  ];

  addCard() {
    const newCard: Card = {
      id: this.cards.length + 1,
      title: `Card ${this.cards.length + 1}`,
      imageUrl: `https://picsum.photos/200/200?random=${this.cards.length + 1}`
    };
    // Creating new array to trigger change detection
    this.cards = [...this.cards, newCard];
  }
  replaceCards() {
    this.cards = [
      {
        id: 1,
        title: 'Card 1',
        imageUrl: 'https://picsum.photos/200/200?random=1'
      },
      {
        id: 2,
        title: 'Card 2',
        imageUrl: 'https://picsum.photos/200/200?random=2'
      },
      {
        id: 3,
        title: 'Card 3 - Like to break things',
        imageUrl: 'https://picsum.photos/200/200?random=3'
      }
    ];
  }
}
