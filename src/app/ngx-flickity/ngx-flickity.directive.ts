import {
  AfterViewChecked,
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

function getWindow(): Window {
  return window;
}

@Directive({
  selector: '[flickity]',
})
export class FlickityDirective implements OnInit, OnDestroy, AfterViewChecked {
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

      this.flickity.on('scroll', () => {
        this.changeDetection.detectChanges();
      });

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
  }

  ngOnDestroy() {
    if (this.flickity) {
      this.flickity.destroy();
    }
  }

  ngAfterViewChecked() {
    const event = new Event('resize');
    getWindow().dispatchEvent(event);
  }
}
