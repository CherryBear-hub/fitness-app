import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Meal, Workout} from "../../../../utils/types";

@Component({
  selector: 'fit-schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnInit{
  @Input() section: any | null;
  @Input() list: Workout[] | Meal[] | null = null;

  @Output() update = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  private selected: string[] = [];

  get workoutList(): Workout[]{
    return this.list as Workout[]
  }

  get mealList(): Meal[]{
    return this.list as Meal[]
  }

  ngOnInit() {
    this.selected = [...this.section.assigned]
  }

  getRoute(name: string) {
    return [`/`, name, 'new'];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name)
  }

  toggleItem(name: string) {
    if(this.exists(name)){
      this.selected.filter((item) => item !== name)
    }
    else{
      this.selected = [...this.selected, name]
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
