import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LifecycleLoggerDirective } from '../../directives/lifecycle-logger.directive';

@Component({
  selector: 'app-intro-lifecycle',
  standalone: true,
  imports: [CommonModule, RouterLink, LifecycleLoggerDirective],
  template: `
    <div class="container">
      <header class="header">
        <h1>Introduction: Component Lifecycle Logger</h1>
        <nav>
          <a routerLink="/">← Home</a>
          <a routerLink="/step-1" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>Understanding Component Lifecycle</h2>
        <p>
          Before we dive into performance issues, let's understand how we can track when Angular
          components are created and destroyed. We'll use a custom directive that logs these lifecycle events.
        </p>

        <div class="code-example">
          <h3>Lifecycle Logger Directive:</h3>
          <pre><code>
{{ '@' }}Directive({{ '{' }}
  selector: '[appLifecycleLogger]',
  standalone: true
{{ '}' }})
export class LifecycleLoggerDirective implements OnInit, OnDestroy {{ '{' }}
  private instanceId = Math.random().toString(36).substring(7);

  ngOnInit() {{ '{' }}
    console.log('(+) Component created - Instance ID: ' + this.instanceId);
  {{ '}' }}

  ngOnDestroy() {{ '{' }}
    console.log('(-) Component destroyed - Instance ID: ' + this.instanceId);
{{ '}' }}
          </code></pre>
        </div>

        <h3>How to Use It</h3>
        <p>
          Simply add the <code>appLifecycleLogger</code> directive to any element you want to track:
        </p>

        <div class="code-example">
          <pre><code>&lt;div appLifecycleLogger&gt;This element will be tracked&lt;/div&gt;</code></pre>
        </div>
      </div>

      <div class="demo">
        <h3>Live Demo</h3>
        <p>Open your browser's console and click the buttons below to see the lifecycle events:</p>

        <div class="demo-container">
          <button (click)="toggleElement()" class="btn">
            {{ showElement ? 'Destroy' : 'Create' }} Element
          </button>

          <div class="demo-element" *ngIf="showElement" appLifecycleLogger>
            <h4>Demo Element</h4>
            <p>This element will be created and destroyed when you click the button.</p>
          </div>
        </div>
      </div>

      <div class="next-steps">
        <h3>What's Next?</h3>
        <p>
          In the following steps, we'll use this directive to demonstrate how Angular handles
          component creation and destruction in different scenarios, particularly with *ngFor
          and performance optimizations.
        </p>
        <a routerLink="/step-1" class="btn next-btn">Continue to NgFor Performance Issue →</a>
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
      background-color: #f7fafc;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .code-example {
      background-color: #2d3748;
      color: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      overflow-x: auto;
    }
    .code-example code {
      white-space: pre;
      font-family: monospace;
    }
    .demo {
      margin: 2rem 0;
    }
    .demo-container {
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .demo-element {
      background-color: #f7fafc;
      padding: 1rem;
      border-radius: 4px;
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
    .next-steps {
      margin-top: 3rem;
      padding: 1.5rem;
      background-color: #f0fff4;
      border: 1px solid #9ae6b4;
      border-radius: 4px;
    }
    .next-btn {
      display: inline-block;
      margin-top: 1rem;
      text-decoration: none;
    }
  `]
})
export class IntroLifecycleComponent {
  showElement = false;

  toggleElement() {
    this.showElement = !this.showElement;
  }
}
