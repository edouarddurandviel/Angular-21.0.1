import {
  concatAll,
  exhaustAll,
  filter,
  first,
  from,
  map,
  mergeAll,
  mergeScan,
  Observable,
  of,
  pluck,
  Subject,
  switchAll,
  takeUntil,
} from 'rxjs';

// pipable operators

// creation operators: functions to create observable with common predefined behaviors
// square function
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((computed) => console.log(computed));

// get first value
of(1, 2, 3)
  .pipe(
    filter((v) => v % 2 === 0),
    first(),
  )
  .subscribe((firstItem) => console.log(firstItem));

// operator to subscribe in inner observable
concatAll();
mergeAll();
switchAll();
exhaustAll();

// observable
const numbers$ = new Observable<number>((subscriber) => {
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
    return 'got value ' + x;
  },
  error: (err: Error) => {
    return 'something wrong occurred: ' + err;
  },
  complete: () => {
    return 'Completed';
  },
};

numbers$.subscribe(observer);

console.log('just after subscribe');

// subjects
const rabbitMq = new Subject<string>();
rabbitMq.subscribe({
  next: (v: string) => `Observer A: ${v} -> rabbitMQ`,
});

const socketIO = new Subject<string>();
socketIO.subscribe({
  next: (v: string) => `Observer B: ${v} -> socketIO`,
});

rabbitMq.next('RabbitMq sended message');
socketIO.next('socketIO sended message');

const messagesList$ = from(['Message 1', 'Message 2', 'Message 3']);
messagesList$.subscribe(rabbitMq);
messagesList$.subscribe(rabbitMq);

// map => apply projection with each value from source
// mapTo => map every emission to string
// switchMap => to a new observable and forget previous ones if their are to long: memory leaks
// /flatMap => is better to keep all observables alive.
// concatMap => keeps in order each observables
// mergeScan => accumulate value over time
of(1, 2, 3)
  .pipe(
    mergeScan((acc, curr, index) => of(acc + curr + index), 0),
    takeUntil()
  )
  .subscribe((value) => console.log(value));

// takeUntil
let destroy$ = new Subject<void>();
let observable$ = new Observable<void>();

observable$
  .pipe(takeUntil(destroy$))
  .subscribe(data => console.log(data));

ngOnDestroy() {
  destroy$.next();
  destroy$.complete();
}

// pluck => retreive values from keys  pluck()
const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Sarah', age: 35 }
]);
//grab names
const example = source.pipe(pluck('name'));
//output: "Joe", "Sarah"
const subscribe = example.subscribe(val => console.log(val));



