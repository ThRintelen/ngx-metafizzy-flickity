# [Metafizzy Flickity](https://flickity.metafizzy.co/) for Angular

## Changelog

### 7.0.0
- Update to Angular 17.0

### 6.1.0
- Update to standalone
- BREAKING CHANGES: remove module for import

### 6.0.2
- Update all dependencies

### 6.0.1
- Update all dependencies

### 6.0.0
- Update to Angular 16.0

### 5.0.0
- Update to Angular 15.0

### 4.0.0
- Update to Angular 14.0
- Added a staticClick event emmiter (thanks paimfp)
- Fix triggers change detection unnecessary (thanks paimfp)

### 3.0.0
- Update to Angular 13.0

### 2.2.10
- Update to Angular 12.2

### 2.0.1
- Update dependencies

### 2.0.0
- Update to Angular 12


## Installation of ngx-metafizzy-flickity

`npm install ngx-metafizzy-flickity --save`

## Installation of flickity

`npm install flickity --save`

Add flickity in angular.json (since Angular 10)

```typescript
    "build": {
        ...
        "options": {
        ...
        "styles": [
            "src/styles.scss",
            "node_modules/flickity/dist/flickity.css"
        ],
        "allowedCommonJsDependencies": ["flickity"]
        },
        ...
    },
```

## Usage

Import `FlickityDirective` into your app's modules:

```typescript
import { FlickityDirective } from 'ngx-metafizzy-flickity';

@NgModule({
  imports: [
    FlickityDirective
  ]
})
```

```typescript
@Component({
  selector: "my-component",
  template: `
    <div flickity>
      <div *ngFor="let child of children">{{ child.title }}</div>
    </div>
  `,
})
class MyComponent {
  children = [{ title: "Child 1" }, { title: "Child 2" }, { title: "Child 3" }];
}
```

## Configuration

### Options

Read about Flickity options here: https://flickity.metafizzy.co/options.html

#### Examples

Inline object:

```html
<div
  flickity
  [flickityConfig]="{cellAlign: 'left', percentPosition: true, groupCells: true}"
></div>
```

#### Default options

```typescript
@Input() flickityConfig: Flickity.Options = {
    groupCells: true,
    cellAlign: 'center',
    pageDots: true,
    draggable: true,
    prevNextButtons: true,
};
```

## Events

### ready: `EventEmitter<Flickity>`

Triggered after flickity is ready.

> https://flickity.metafizzy.co/events.html#ready

### change: `EventEmitter<number>`

Triggered after page is changed.

> https://flickity.metafizzy.co/events.html#change

### click: `EventEmitter<{event: PointerEvent, pointer: PointerEvent, cellElement: string, cellIndex: number}>`

Triggered after click an element.

> https://flickity.metafizzy.co/events.html#staticClick

### Examples

```html
<div flickity (change)="onChange($event)" (click)="onClick($event)"></div>
```

### Demo

```html
ng serve
```
