import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UnionToArray } from 'src/app/core/types/Methods';
import { inArrayValidator } from 'src/app/core/validators/inArrayValidator';
import { ItemType } from 'src/app/core/types/Unions';
import {
  bookStatusList,
  filmStatusList,
  formGroups,
} from 'src/app/core/types/Consts';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
})
export class AdicionarComponent implements OnInit {
  item: ItemType = 'Livro';
  itemTypes: UnionToArray<ItemType> = ['Livro', 'Filme', 'Album'];

  tagInput: string = '';
  tags: string[] = [];

  bookForm!: FormGroup;
  filmForm!: FormGroup;
  albumForm!: FormGroup;

  mainForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // BOOK
    this.bookForm = this.fb.group(formGroups.books);
    this.mainForm = this.bookForm;
    // FILM
    this.filmForm = this.fb.group(formGroups.films);
    // ALBUM
    // insert fbGroup in albumObj
    const albumfb = {
      ...formGroups.albums,
      albumReview: this.fb.group(formGroups.albums.albumReview),
    };
    this.albumForm = this.fb.group(albumfb);
  }

  onItemSelect(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.item = selectedType as typeof this.item;
    if (selectedType === 'Livro') {
      this.mainForm = this.bookForm;
    } else if (selectedType === 'Filme') {
      this.mainForm = this.filmForm;
    } else if (selectedType === 'Album') {
      this.mainForm = this.albumForm;
    }
  }
}
