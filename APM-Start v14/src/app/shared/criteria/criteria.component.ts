import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() displayDetail!: boolean;
  @Input() hitCount?: number ;
  @ViewChild('filterElement') filterElementRef!: ElementRef;

  hitMessage='';

  // Event emitter to send the filter crieteria to the parent component
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  private _listFilter= '';
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }
  get listFilter() {
    return this._listFilter;
  }


  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      if(this.filterElementRef)
        this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['hitCount'] && !changes['hitCount'].currentValue)
        this.hitMessage = 'No match was found'
      else
        this.hitMessage = 'Hits: ' + this.hitCount;
  }

}
