import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-box">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (keyup.enter)="onEnter()"
        placeholder="Type and press Enter to search..."
        class="search-input"
      >
      <div class="search-info">
        Current term: "{{ searchTerm }}"
        <br>
        <small>(Notice how typing doesn't trigger card re-renders)</small>
      </div>
    </div>
  `,
  styles: [`
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
    .search-info {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #edf2f7;
      border-radius: 4px;
      font-size: 0.875rem;
    }
  `]
})
export class SearchBoxComponent {
  searchTerm = '';
  @Output() search = new EventEmitter<string>();

  onEnter() {
    this.search.emit(this.searchTerm);
  }
}
