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

export interface ScheduleSection extends ScheduleSectionBase{
  //TODO: rework with enum
  section: 'morning' | 'lunch' | 'evening' | 'snacks';
  day: Date;

}

export interface ScheduleSectionBase {
  type: SectionType;
  assigned: Meal[] | Workout[];
  data?: ScheduleItem;
}

export type SectionType = 'meals' | 'workouts';

//TODO: rework with enum
export const SCHEDULE_SECTIONS = [
  { key: 'morning', name: 'Morning' },
  { key: 'lunch', name: 'Lunch' },
  { key: 'evening', name: 'Evening' },
  { key: 'snacks', name: 'Snacks and Drinks' },
];

export const WEEK_DAYS = [
  {name: 'Monday', short: 'M'},
  {name: 'Tuesday', short: 'T'},
  {name: 'Wednesday', short: 'W'},
  {name: 'Thursday', short: 'T'},
  {name: 'Friday', short: 'F'},
  {name: 'Saturday', short: 'S'},
  {name: 'Sunday', short: 'S'},
]

