import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import * as Flickity from 'flickity';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

function getWindow(): Window {
  return window;
}

@Directive({
  selector: '[flickity]',
})
export class FlickityDirective implements AfterViewInit, OnDestroy {
  @Input() flickityConfig: Flickity.Options = {
    groupCells: true,
    cellAlign: 'center',
    pageDots: true,
    draggable: true,
    prevNextButtons: true,
  };

  @Output() ready = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  @Output() staticClick = new EventEmitter<any>(true);

  flickity: any;
  resize = Subscription.EMPTY;

  constructor(
    public readonly elementRef: ElementRef,
    private readonly changeDetection: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.flickity = new Flickity(
        this.elementRef.nativeElement,
        this.flickityConfig
      );

      this.ready.emit(this.flickity);

      this.flickity.on('change', (count: number) => {
        this.zone.run(() => this.change.emit(count));
      });

      this.flickity.on(
        'staticClick',
        (
          event: PointerEvent,
          pointer: PointerEvent,
          cellElement: HTMLElement,
          cellIndex: number
        ) => {
          this.zone.run(() =>
            this.staticClick.emit({ event, cellElement, cellIndex })
          );
        }
      );
    });

    this.resize = fromEvent(window, 'resize')
      .pipe(startWith(1), debounceTime(500))
      .subscribe(() => this.changeDetection.detectChanges());
  }

  ngOnDestroy() {
    if (this.flickity) {
      this.flickity.destroy();
    }

    this.resize.unsubscribe();
  }
}
