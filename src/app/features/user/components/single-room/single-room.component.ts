import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { IRoom } from '../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss'
})
export class SingleRoomComponent implements OnInit {
  @Input() room: IRoom | null = null;
  constructor() {
  }
  ngOnInit(): void {
    console.log('Room:', this.room);
  }
}
