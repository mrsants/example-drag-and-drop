import { Component, VERSION, ViewChild, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  @ViewChild('rect', { static: true }) rect: ElementRef

  top: number = 40;
  left: number = 40;

  constructor() {

  }

  ngOnInit() {
    const mouseDown = fromEvent(this.rect.nativeElement, 'mousedown');
    const mouseMove = fromEvent(document, 'mousemove');
    const mouseUp = fromEvent(document, 'mouseup');

    mouseDown.subscribe((em: MouseEvent) => {
      let x = em.screenX;
      let y = em.screenY;

      mouseMove
      .pipe(takeUntil(mouseUp))
      .subscribe((ev: MouseEvent) => {
        const screenX = x - ev.screenX;
        const screenY = y - ev.screenY;

        this.top -= screenY;
        this.left -= screenX;

        x = ev.screenX;
        y = ev.screenY;
      })
    });
  }

}
