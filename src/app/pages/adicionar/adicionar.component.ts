import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css'],
})
export class AdicionarComponent implements OnInit {
  item = 'item';
  itemTypes = ['Livro', 'Filme', 'Música'];
  statusList = ['Lido', 'Lendo', 'Quero Ler', 'Em Espera', 'Abandonado'];

  mainForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      title: [''],
      author: [''],
      genre: [''],
      cover: [''],
      year: [''],
      pages: [''],
      status: [''],
      rating: [1, [Validators.min(1), Validators.max(5)]],
      quotesForm: this.fb.group({
        quotes: this.fb.array([]),
      }),
    });
  }

  get quotes(): FormArray {
    return this.mainForm.get('quotesForm.quotes') as FormArray;
  }

  onItemSelect(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.item = selectedType;
  }

  addQuote() {
    this.quotes.push(
      this.fb.group({
        quote: [''],
        page: [0],
      })
    );
  }
}
