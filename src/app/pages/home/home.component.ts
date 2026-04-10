import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Angular Performance Examples</h1>

      <div class="intro-card">
        <h2>🎓 Introduction</h2>
        <p>Start here to learn about tips that you can apply to optimize your Angular Application:</p>
        <ul>
          <li>Understanding component lifecycle</li>
          <li>Using the LifecycleLogger directive</li>
          <li>Tracking component creation and destruction</li>
          <li>DNS Lookups impact</li>
          <li>Fix layout shifts</li>
          <li>Intrinsic size and responsive images</li>
          <li>Modern image formats</li>
          <li>You're in trouble using functions in the template</li>
          <li>ChangeDetection is not always the solution</li>
          <li>Defer problems for later</li>
          <li>You don't like water but you'll get hydrated today</li>
          <li>Or at least partially</li>
          <li>Hold those events</li>
          <li>Stop asking the same</li>
        </ul>
        <a routerLink="/intro" class="btn">Start Here</a>
      </div>

      <!-- <div class="cards">
        <div class="card problematic">
          <h2>❌ Problematic Version</h2>
          <p>This version demonstrates common performance issues:</p>
          <ul>
            <li>Large unoptimized PNG images</li>
            <li>Multiple DNS lookups</li>
            <li>Inefficient NgFor usage</li>
          </ul>
          <a routerLink="/step-1" class="btn">View Problematic Version</a>
        </div>

        <div class="card optimized">
          <h2>✅ Optimized Version</h2>
          <p>This version shows best practices:</p>
          <ul>
            <li>Optimized images with modern formats</li>
            <li>Single CDN domain</li>
            <li>Efficient NgFor with trackBy</li>
          </ul>
          <a routerLink="/step-2" class="btn">View Optimized Version</a>
        </div>
      </div> -->
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .intro-card {
      background-color: #ebf8ff;
      border: 1px solid #90cdf4;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .card {
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .problematic {
      background-color: #fff5f5;
      border: 1px solid #feb2b2;
    }
    .optimized {
      background-color: #f0fff4;
      border: 1px solid #9ae6b4;
    }
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      margin-top: 1rem;
      border-radius: 4px;
      text-decoration: none;
      color: white;
      background-color: #4a5568;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #2d3748;
    }
  `]
})
export class HomeComponent {}
