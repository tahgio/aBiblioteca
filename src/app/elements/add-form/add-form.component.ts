import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import {
  ToastTypes,
  bookStatusList,
  filmStatusList,
} from 'src/app/core/types/Consts';
import { assureNever, convertItemToEntry } from 'src/app/core/types/Methods';
import {
  MovieLineModel,
  QuoteModel,
  TrackModel,
} from 'src/app/core/types/Models';
import {
  EntryType,
  FormModels,
  ItemType,
  SubFormModels,
} from 'src/app/core/types/Unions';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
})
export class AddFormComponent {
  @Input() itemType!: ItemType;
  @Input() form!: FormGroup;

  bookStatusList = bookStatusList;
  filmStatusList = filmStatusList;

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
    this.initForms();
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
    if (type === 'Livro') {
      this.quotes.removeAt(index);
    } else if (type === 'Filme') {
      this.movieLines.removeAt(index);
      //TODO: add logic for updating tracknumber when removing it
    } else if (type === 'Album') {
      this.tracks.removeAt(index);
    }
  }

  /*
   * Submit button method that adds form obj to db
   */
  submitForm(formValue: FormModels): void {
    // Init
    const entry = convertItemToEntry(this.itemType);
    // Call service that adds entry to db
    this.store
      .addToCollection(entry, formValue, this.getSubForm(entry), this.form)
      // Show success toast if everything ok
      .then(() => {
        this.msg.showToast(
          ToastTypes.success,
          `Seu ${this.itemType} foi adicionado com sucesso!`
        );
      })
      // Throw error if not
      .catch((err: Error) => {
        this.msg.showToast(
          ToastTypes.error,
          `Ocorreu um erro ao tentar adicionar o ${this.itemType} à base de dados`
        );
        throw err;
      });
    //Reset Form
    this.resetForm();
  }

  /*
   * Reset All Forms and all form states
   */
  private resetForm(): void {
    // Reset form
    this.form.reset();
    // Reset tags
    this.tags = [];
    // Reset all subForms And set it to initial state
    this.quotes.reset();
    this.movieLines.reset();
    this.tracks.reset();
    this.initForms();
  }

  /*
   * Set forms to init state
   */
  private initForms() {
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

  /*
   * Tag Methods
   */
  // Add tag to Selected form
  addTag(event: Event) {
    event.preventDefault();
    const lookForDup = this.tags.findIndex(
      (element) => element.toLowerCase() === this.tagInput.trim().toLowerCase()
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

  // Remove tag to Selected form
  popTag(name: string) {
    this.tags = this.tags.filter((e) => e !== name);
    this.form.get('tags')?.setValue(this.tags);
  }

  /*
   * Get SubForm from entryType
   */
  getSubForm(entry: EntryType): SubFormModels[] {
    switch (entry) {
      case 'books':
        return this.quotes.value as QuoteModel[];
      case 'albums':
        return this.tracks.value as TrackModel[];
      case 'films':
        return this.movieLines.value as MovieLineModel[];
      default:
        throw assureNever(entry);
    }
  }
}
