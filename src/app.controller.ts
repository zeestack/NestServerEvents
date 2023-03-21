import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { fromEvent, map } from 'rxjs';
import type { DataItem } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): any {
    return this.appService.getList();
  }

  @Post()
  postItem(@Body() data: DataItem) {
    return this.appService.postItem(data);
  }

  @Sse('Items')
  listenToTheNewUpdates() {
    return fromEvent(this.appService.getEventEmitter(), 'newItem.added').pipe(
      map((item) => ({ data: { item } })),
    );
  }
}
