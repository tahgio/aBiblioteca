import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { convertToEntrytype } from 'src/app/core/types/Methods';
import { EntryType, ItemType } from 'src/app/core/types/Unions';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
})
export class AddFormComponent {
  @Input() itemType!: ItemType;
  @Input() form!: any;

  statusList = ['Lido', 'Lendo', 'Quero Ler', 'Em Espera', 'Abandonado'];
  tagInput: string = '';
  tags: string[] = [];

  quotesForm!: FormGroup;
  linesForm!: FormGroup;
  tracksForm!: FormGroup;

  get quotes(): FormArray {
    return this.quotesForm.get('quotes') as FormArray;
  }
  get movieLines(): FormArray {
    return this.linesForm.get('movieLines') as FormArray;
  }
  get tracks(): FormArray {
    return this.tracksForm.get('tracks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private msg: MessageService,
    private store: StoreService
  ) {
    // SUBCOLLECTION FORMS
    this.quotesForm = this.fb.group({
      quotes: this.fb.array([]),
    });
    this.linesForm = this.fb.group({
      movieLines: this.fb.array([]),
    });
    this.tracksForm = this.fb.group({
      tracks: this.fb.array([]),
    });
  }

  addSub(type: 'Livro' | 'Filme'): void;
  addSub(type: 'Album', trackNumber: number): void;
  addSub(type: ItemType, trackNumber?: number): void {
    if (type === 'Livro') {
      this.quotes.push(
        this.fb.group({
          quote: [''],
          page: [0],
        })
      );
    } else if (type === 'Filme') {
      this.movieLines.push(
        this.fb.group({
          movieLine: [''],
        })
      );
    } else if (type === 'Album') {
      this.tracks.push(
        this.fb.group({
          trackName: [''],
          trackNumber: [trackNumber],
          time: [''],
        })
      );
    }
  }

  rmvSub(type: ItemType, index: number) {
    if ((type = 'Livro')) {
      this.quotes.removeAt(index);
    } else if ((type = 'Filme')) {
      this.movieLines.removeAt(index);
      //TODO: add logic for updating tracknumber when removing it
    } else if ((type = 'Album')) {
      this.tracks.removeAt(index);
    }
  }

  /*
   * Submit button method that adds form obj to db
   */
  submitForm(formValue: any): void {
    console.log({ formValue });
    this.store.addToCollection(
      convertToEntrytype(this.itemType),
      formValue,
      this.quotes.value
    );
    this.msg.showToast(
      'success',
      `Seu ${this.itemType} foi adicionado com sucesso!`
    );
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
