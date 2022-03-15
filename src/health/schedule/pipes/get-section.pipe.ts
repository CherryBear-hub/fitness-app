import { Pipe, PipeTransform } from '@angular/core';
import {ScheduleItem, ScheduleList} from "../../../utils/types";

@Pipe({
  name: 'getSection'
})
export class GetSectionPipe implements PipeTransform {

  transform(value: ScheduleList | null | undefined, sectionName: string): ScheduleItem {
    return (value && value[sectionName])  || {};
  }

}
