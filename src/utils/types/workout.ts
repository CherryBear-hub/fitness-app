export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  endurance: {
    distance: number,
    duration: number,
  };
  strength: {
    reps: number,
    sets: number,
    weight: number,
  };
}

export enum WorkoutType {
  Strength = 'strength',
  Endurance = 'endurance',
}

export function instanceOfWorkout(data: any): data is Workout {
  return 'id' in data && 'name' in data && 'type' in data;
}
