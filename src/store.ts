import {BehaviorSubject, distinctUntilKeyChanged, Observable, pluck, scan, Subject} from "rxjs";

export interface State {
  [key: string]: any
}

const state: State = {};

export class Store{
  private readonly store: BehaviorSubject<State>;
  private stateUpdate: Subject<State>;

  constructor() {
    this.store = new BehaviorSubject(state);
    this.stateUpdate = new Subject<State>()

    this.stateUpdate.pipe(scan((acc, cur) => ({...acc, ...cur}), state)).subscribe(this.store)
  }

  updateState(stateUpdate: State): void{
    this.stateUpdate.next(stateUpdate)
  }

  selectedState<T>(stateKey: string): Observable<T>{
    return this.store.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey))
  }

  stateChange(): Observable<State>{
    return this.store.asObservable();
  }
}