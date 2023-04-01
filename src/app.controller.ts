import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { fromEvent, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): any {
    return this.appService.getList();
  }

  @Post('webhook')
  postItem(@Body() data: any) {
    return this.appService.postItem(data);
  }

  @Sse('webAppEvents')
  listenToTheNewUpdates() {
    return fromEvent(this.appService.getEventEmitter(), 'event').pipe(
      map((item) => ({ data: item })),
    );
  }
}
