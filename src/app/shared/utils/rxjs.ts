import { concatAll, exhaustAll, first, map, mergeAll, Observable, of, switchAll } from 'rxjs';

// pipable operators

// creation operators: functions to create observable with common predefined behaviors
// square function
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(v));

// get first value
of(1, 2, 3)
  .pipe(first())
  .subscribe((v) => console.log(v));

// operator to subscribe in inner observable
concatAll();
mergeAll();
switchAll();
exhaustAll();

const observable = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');

const observer = {
  next: (x: number) => {
    console.log('got value ' + x);
  },
  error: (err: Error) => {
    console.error('something wrong occurred: ' + err);
  },
  complete: () => {
    console.log('done');
  },
};

observable.subscribe(observer);

console.log('just after subscribe');
