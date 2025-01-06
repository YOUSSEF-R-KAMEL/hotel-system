import { Component, Input, effect, Signal, computed, signal } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-shared-rooms',
  templateUrl: './shared-rooms.component.html',
  styleUrls: ['./shared-rooms.component.scss'],
})
export class SharedRoomsComponent {
  private _rooms = signal<IRoom[]>([]);
  rooms = computed(() => this._rooms());
  @Input()
  set inputRooms(value: IRoom[]) {
    this._rooms.set(value || []);
  }

  constructor() {}
}

