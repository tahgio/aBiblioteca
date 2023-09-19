import {
  Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Nullable } from 'src/app/core/types/Methods';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() mainForm!: FormGroup;
  @Input() static!: number;
  @Input() model!: Nullable<number>;
  @Output() modelChange = new EventEmitter<number>();

  onChange = (rating: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onModelChange(i: number) {
    this.modelChange.emit(i);
  }
}
