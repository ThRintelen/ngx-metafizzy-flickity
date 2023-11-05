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
  inject,
} from '@angular/core';
import Flickity from 'flickity';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

@Directive({
  selector: '[flickity]',
  standalone: true,
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

  readonly elementRef = inject(ElementRef);
  private readonly changeDetection = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

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
