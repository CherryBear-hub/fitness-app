import { Meal } from './meal';
import { Workout } from './workout';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  id?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;

  [key: string]: any;
}

export interface ScheduleSection {
  type: 'meal' | 'workout';
  assigned: any;
  section: 'morning' | 'lunch' | 'evening' | 'snacks';
  day: Date;
  data: ScheduleItem;
}

export const SCHEDULE_SECTIONS = [
  { key: 'morning', name: 'Morning' },
  { key: 'lunch', name: 'Lunch' },
  { key: 'evening', name: 'Evening' },
  { key: 'snacks', name: 'Snacks and Drinks' },
];

