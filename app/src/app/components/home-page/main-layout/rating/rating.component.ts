import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements AfterViewInit {
  @Input()
  value: number = 0;

  @Input()
  starSize: number = 22;

  @Input()
  selectable: boolean = false;

  @Output()
  ratingOutputEvent = new EventEmitter<number>();

  isRatingSelected: boolean = false;
  ratingOutput: number;

  @ViewChild('star1', { read: ElementRef })
  star1: ElementRef<HTMLElement>;

  @ViewChild('star2', { read: ElementRef })
  star2: ElementRef<HTMLElement>;

  @ViewChild('star3', { read: ElementRef })
  star3: ElementRef<HTMLElement>;

  @ViewChild('star4', { read: ElementRef })
  star4: ElementRef<HTMLElement>;

  @ViewChild('star5', { read: ElementRef })
  star5: ElementRef<HTMLElement>;

  // list of all star elements
  stars: ElementRef<HTMLElement>[];

  @ViewChild('title')
  title: ElementRef;

  constructor(
    //rendere2 should be used when working with server side rendering
    //here we don't have to use it
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    ) { }

  ngAfterViewInit() {
    // populate list of stars
    this.stars = [this.star1, this.star2, this.star3, this.star4, this.star5];

    let integer = Math.floor(this.value);
    let remainder = this.value % 1;

    // fill stars with color
    this.fillStars(integer, remainder);

    // set star size in px
    this.setStarsSize();

  }

  fillStars(integer: number, remainder: number) {
    this.stars.forEach((star, index) => {
      // fill 'whole' stars with gold color
      if (index < integer) this.fill(star, 100);
      // fill stars with no color (gray color)
      else this.fill(star, 0);
    })

    // don't fill the last star if there's no remainder
    if (remainder === 0) return;

    // fill the last star with percentage
    // e.g. 0.36 * 100 = 36%
    this.fill(this.stars[integer], remainder * 100);
  }

  //css variable which fills the star with the color
  fill(star: ElementRef<HTMLElement>, percentage: number) {
    star.nativeElement.style.setProperty('--fill', `${percentage}%`);
    // this.star1.nativeElement.style.setProperty('--fill', '60%');
  }

  setStarsSize() {
    this.el.nativeElement.style.setProperty('--starSize', `${this.starSize}px`)
  }

  emptyStars() {

    if( this.isRatingSelected) {
      this.fillStars(this.ratingOutput, 0);
    }
    
    else if (!this.isRatingSelected && this.selectable) {
      this.fillStars(this.value, 0)
    }

  }

  fillSelectedStars(integer: number) {
    if (this.selectable) {
      this.el.nativeElement.style.cursor = 'pointer';
      this.fillStars(integer, 0);
    }
  }
  
  setRating( integer: number) {
    if (this.selectable) {
      this.isRatingSelected = true;
      this.ratingOutput = integer;
      this.ratingOutputEvent.emit(this.ratingOutput);
    }
  }

}
