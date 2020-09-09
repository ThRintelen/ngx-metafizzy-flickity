import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
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
export class FlickityDirective implements OnInit, OnDestroy {
  @Input() flickityConfig: Flickity.Options = {
    groupCells: true,
    cellAlign: 'center',
    pageDots: true,
    draggable: true,
    prevNextButtons: true,
  };

  @Output() ready = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  flickity: any;
  resize = Subscription.EMPTY;

  constructor(
    public readonly elementRef: ElementRef,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.flickity = new Flickity(
        this.elementRef.nativeElement,
        this.flickityConfig
      );
      this.ready.emit(this.flickity);

      this.flickity.on('change', (count: number) => {
        this.change.emit(count);
      });

      this.flickity.on(
        'staticClick',
        (
          event: PointerEvent,
          pointer: PointerEvent,
          cellElement: string,
          cellIndex: number
        ) => {
          this.change.emit({
            event,
            pointer,
            cellElement,
            cellIndex,
          });
        }
      );
    });

    this.resize = fromEvent(getWindow(), 'resize')
      .pipe(startWith(1), debounceTime(500))
      .subscribe(() => this.changeDetection.markForCheck());
  }

  ngOnDestroy() {
    if (this.flickity) {
      this.flickity.destroy();
    }

    this.resize.unsubscribe();
  }
}
