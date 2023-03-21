import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

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

  postItem({ name, email }: DataItem) {
    const item = { id: randomUUID(), name, email };
    this.eventEmitter.emit('newItem.added', item);
    this.lists.push(item);
    return item;
  }

  getEventEmitter() {
    return this.eventEmitter;
  }
}
