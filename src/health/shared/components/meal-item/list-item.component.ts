import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fit-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item?: any

  constructor() { }

  ngOnInit(): void {
  }

}
