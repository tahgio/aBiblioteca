import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
})
export class AddFormComponent {
  @Input() itemType!: 'Livro' | 'Filme' | 'Album' | 'item';
  @Input() form!: any;

  statusList = ['Lido', 'Lendo', 'Quero Ler', 'Em Espera', 'Abandonado'];
  tagInput: string = '';
  tags: string[] = [];

  get quotes(): FormArray {
    return this.form.get('quotesForm.quotes') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  addQuote() {
    this.quotes.push(
      this.fb.group({
        quote: [''],
        page: [0],
      })
    );
  }
  rmvQuote(index: number) {
    this.quotes.removeAt(index);
  }

  submitForm(value: object): void {
    console.log(value);
  }

  addTag(event: Event) {
    event.preventDefault();
    const lookForDup = this.tags.findIndex(
      (e) => e.toLowerCase() === this.tagInput.trim().toLowerCase()
    );
    if (this.tagInput.trim() !== '' && lookForDup < 0) {
      const tag =
        this.tagInput.trim().charAt(0).toUpperCase() +
        this.tagInput.trim().slice(1);
      this.tags.push(tag);
      this.form.get('tags')?.setValue(this.tags);
      this.tagInput = '';
    }
  }

  popTag(name: string) {
    this.tags = this.tags.filter((e) => e !== name);
    this.form.get('tags')?.setValue(this.tags);
  }
}
