import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

export type DataItem = {
  name: string;
  email: string;
  id?: string;
};

@Injectable()
export class AppService {
  lists: Array<DataItem> = [];

  constructor(private eventEmitter: EventEmitter2) {}

  getList() {
    return this.lists;
  }

  postItem(item) {
    this.eventEmitter.emit('event', {
      ...item,
    });
    return item;
  }

  getEventEmitter() {
    return this.eventEmitter;
  }
}
