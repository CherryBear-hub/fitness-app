import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  Observable,
  pluck,
  scan,
  Subject,
} from 'rxjs';
import { Meal, ScheduleList, User, Workout } from './utils/types';

export interface State {
  user?: User;
  meals?: Meal[];
  schedule?: ScheduleList;
  selected?: any;
  workouts?: Workout[];
  date?: Date;
  list?: Meal[] | Workout[];

  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: [],
  workouts: [],
  date: new Date(),
};

export class Store {
  private readonly store: BehaviorSubject<State>;
  private stateUpdate: Subject<State>;

  constructor() {
    this.store = new BehaviorSubject(state);
    this.stateUpdate = new Subject<State>();

    this.stateUpdate
      .pipe(scan((acc, cur) => ({ ...acc, ...cur }), state))
      .subscribe(this.store);
  }

  updateState(stateUpdate: State): void {
    this.stateUpdate.next(stateUpdate);
  }

  selectedState<T>(stateKey: string): Observable<T> {
    return this.store.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  }

  stateChange(): Observable<State> {
    return this.store.asObservable();
  }
}
