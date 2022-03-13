import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {WorkoutType} from "../../../../utils/types";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'fit-workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss']
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = WorkoutType;

  value?: WorkoutType;

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: WorkoutType): void {
    this.value = value;
  }

  setSelected(selector: WorkoutType) {
    this.value = selector
    this.onModelChange(selector);
    this.onTouch();
  }

  private onTouch: Function = () => {};

  private onModelChange: Function = () => {};
}
