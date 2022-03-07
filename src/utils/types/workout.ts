export interface Workout{
  id: string,
  name: string,
  type: 'endurance' | 'strength';
  endurance: any;
  strength: any;
}

export function instanceOfWorkout(data: any): data is Workout{
  return 'id' in data && 'name' in data  //'strength' in data && 'endurance' in data;
}
