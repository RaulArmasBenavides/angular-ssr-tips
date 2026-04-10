import { ResolveFn } from '@angular/router';
import { delay, of } from 'rxjs';

export const delayResolver: ResolveFn<boolean> = () => {
  console.log('Resolver started - waiting 3 seconds...');
  return of(true).pipe(delay(3000));
};
