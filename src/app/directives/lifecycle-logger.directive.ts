import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLifecycleLogger]',
  standalone: true
})
export class LifecycleLoggerDirective implements OnInit, OnDestroy {
  ngOnInit() {
    console.log(`%c🟢 Component created`, 'color: #22c55e');
  }

  ngOnDestroy() {
    console.log(`%c🔴 Component destroyed`, 'color: #ef4444');
  }
}
